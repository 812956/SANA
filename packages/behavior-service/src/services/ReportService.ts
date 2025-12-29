
import prisma from "../config/prisma";
import { v4 as uuidv4 } from "uuid";
import { elfService } from "./ElfService";
import { kafkaService } from "./KafkaService";

export class ReportService {
    async getRecentEvents() {
        const reports = await prisma.report.findMany({
            take: 50,
            orderBy: { timestamp: 'desc' },
            include: { child: true }
        });

        return reports.map(r => ({
            id: r.id,
            type: r.type,
            name: r.child.name,
            description: r.description,
            location: r.child.location,
            lat: r.child.lat,
            lng: r.child.lng,
            timestamp: r.timestamp.toISOString(),
            requiresToy: false, 
            childId: r.childId,
            newStatus: r.child.status
        }));
    }

    async createReport(data: any, file: any) {
        const { childId, type, description, elfId } = data;

        // 1. Get current state
        const child = await prisma.child.findUnique({ where: { id: childId } });
        if (!child) throw new Error("Child not found");

        const oldStatus = child.status;

        // 2. Calculate New Score
        let newScore = child.behaviorScore;
        if (type === 'NICE') newScore = Math.min(100, newScore + 15);
        if (type === 'NAUGHTY') newScore = Math.max(0, newScore - 20);

        // 3. Determine New Status
        let newStatus = child.status;
        if (newScore > 80) newStatus = 'NICE';
        else if (newScore > 40) newStatus = 'NEEDS_IMPROVEMENT';
        else newStatus = 'NAUGHTY';

        // 4. Update Child
        const updatedChild = await prisma.child.update({
            where: { id: childId },
            data: { status: newStatus, behaviorScore: newScore }
        });

        // 5. Create Report
        const report = await prisma.report.create({
            data: {
                childId,
                type,
                description,
                mediaUrl: file ? `/uploads/${file.filename}` : null
            }
        });

        // --- GAMIFICATION: Award Elf ---
        if (elfId) {
            await elfService.awardPoints(elfId, 15, `Reported ${child.name} as ${type}`);
        }

        // 6. SMART LOGIC: Determine if Toy Production is authorized
        // Assuming TOY_AUTHORIZED implies transitioning to NICE
        const requiresToy = (oldStatus !== 'NICE' && newStatus === 'NICE');

        // 7. Send Kafka Event
        const event = {
            id: uuidv4(),
            type,
            name: child.name,
            description,
            location: child.location,
            lat: child.lat,
            lng: child.lng,
            timestamp: new Date().toISOString(),
            requiresToy,
            childId,
            newStatus
        };

        console.log("[DEBUG] Emitting Event Payload:", JSON.stringify(event, null, 2));

        try {
            await kafkaService.sendEvent(event);
        } catch (e) {
            console.warn("Kafka failed, skipping explicit fallback as it's handled or ignored in logic", e);
        }

        console.log(`[REPORT] ${child.name}: ${type} (${description}). Toy Authorized: ${requiresToy}`);
        
        return { success: true, report, child: updatedChild };
    }
    async getToyDemand() {
        // Count unique children that have at least one report.
        // Logic: Distinct childId from Report table.
        const result = await prisma.report.groupBy({
            by: ['childId'],
            _count: {
                childId: true
            }
        });
        return {
            toysNeeded: result.length,
            // Optional: breakdown by type if needed later
        };
    }
}

export const reportService = new ReportService();
