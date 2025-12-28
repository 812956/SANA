
import { Request, Response } from 'express';
import { authService } from '../services/AuthService';
import { childService } from '../services/ChildService';
import { elfService } from '../services/ElfService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ElfController {
    
    // Auth
    async login(req: Request, res: Response) {
        try {
            const { agentId, password } = req.body;
            const elf = await authService.login(agentId, password);
            res.json(elf);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const profile = await authService.getProfile(id);
            if (!profile) return res.status(404).json({ error: "Elf not found" });
            res.json(profile);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Children Management (Proxied to ChildService but could have Elf specific logic)
    async getChildren(req: Request, res: Response) {
        try {
            const result = await childService.getChildren(req.query);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getChild(req: Request, res: Response) {
        try {
            const child = await childService.getChildById(req.params.id);
            if (!child) return res.status(404).json({ error: "Child not found" });
            res.json(child);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Reporting
    async submitReport(req: Request, res: Response) {
        try {
            const { elfId, childId, type, description, location, lat, lng } = req.body;

            // 1. Create Report
            const report = await prisma.report.create({
                data: {
                    type, // NICE or NAUGHTY
                    description,
                    childId,
                    reporterId: elfId,
                    locationName: location,
                    lat,
                    lng
                }
            });

            // 2. Update Child Points
            let pointChange = 0;
            if (type === 'NICE') pointChange = 5; // Standard deed
            if (type === 'NAUGHTY') pointChange = -5;
            
            await childService.updateBehaviorScore(childId, pointChange);

            // 3. Award Elf Points
            const elfPoints = 10; // 10 pts per report
            // For now accessing Prisma directly here or via ElfService if implemented fully
            // Quick implementation here:
            await prisma.elf.update({
                where: { id: elfId },
                data: { 
                    points: { increment: elfPoints },
                    workLogs: {
                        create: {
                            action: "REPORT",
                            description: `Submitted ${type} report for child ${childId}`,
                            pointsEarned: elfPoints
                        }
                    }
                }
            });

             // Check for Level Up (Simple logic: Level = Points / 100)
            const updatedElf = await prisma.elf.findUnique({ where: { id: elfId } });
            if (updatedElf) {
                 const newLevel = Math.floor(updatedElf.points / 100) + 1;
                 if (newLevel > updatedElf.level) {
                     let newTitle = "Senior Elf";
                     if (newLevel > 5) newTitle = "Super Senior Elf";
                     if (newLevel > 10) newTitle = "Master Elf";

                     await prisma.elf.update({
                         where: { id: elfId },
                         data: { level: newLevel, title: newTitle }
                     });
                 }
            }

            // 4. Return success
            res.json({ success: true, report });
            
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

export const elfController = new ElfController();
