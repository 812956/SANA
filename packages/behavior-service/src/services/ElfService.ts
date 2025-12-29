
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ElfService {
    async getAllElves() {
        return prisma.elf.findMany({
            orderBy: { points: 'desc' },
            include: {
                workLogs: { orderBy: { timestamp: 'desc' }, take: 5 }
            }
        });
    }

    async getElfById(id: string) {
        return prisma.elf.findUnique({
            where: { id },
            include: {
                workLogs: { orderBy: { timestamp: 'desc' }, take: 10 },
                reports: { orderBy: { timestamp: 'desc' }, take: 5 }
            }
        });
    }

    async awardPoints(elfId: string, points: number, reason: string) {
        console.log(`[GAMIFICATION] Awarded ${points} pts to Elf ${elfId} for: ${reason}`);
        
        await prisma.elf.update({
            where: { id: elfId },
            data: { 
                points: { increment: points },
                workLogs: {
                    create: {
                        action: points > 0 ? "AWARD" : "PENALTY",
                        description: reason,
                        pointsEarned: points
                    }
                }
            }
        });
        return true;
    }

    async createElf(data: any) {
        // Basic creation - passwords should be hashed in production but plaintext for this demo as per history
        return prisma.elf.create({
            data: {
                name: data.name,
                agentId: data.agentId,
                password: data.password || 'northpole123',
                title: 'Junior Elf',
                level: 1,
                points: 0
            }
        });
    }
}

export const elfService = new ElfService();
