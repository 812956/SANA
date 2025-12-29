
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ElfService {
    async getAllElves(params: { page?: number; limit?: number; search?: string; level?: string; department?: string }) {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (params.search) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { agentId: { contains: params.search, mode: 'insensitive' } }
            ];
        }

        if (params.department && params.department !== 'ALL') {
            where.department = params.department;
        }

        if (params.level && params.level !== 'ALL') {
            // Mapping string levels to int range if needed, or exact match if schema used strings.
            // Schema uses Int for level. UI sends strings like "Master".
            // We need a mapping strategy or change schema.
            // For now, let's assume UI sends numeric string "1", "2" OR we map names.
            // UI send: 'Elder', 'Master' etc.
            // Simple mapping for demo:
            const levelMap: Record<string, number> = {
                'Apprentice': 1, 'Junior': 2, 'Senior': 4, 'Master': 5, 'Elder': 7
            };
            if (levelMap[params.level]) {
                where.level = { gte: levelMap[params.level] }; 
            }
        }

        const [elves, total] = await Promise.all([
            prisma.elf.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { points: 'desc' },
                include: {
                    workLogs: { orderBy: { timestamp: 'desc' }, take: 1 }
                }
            }),
            prisma.elf.count({ where })
        ]);

        return {
            data: elves,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        };
    }

    async getElfById(id: string) {
        return prisma.elf.findUnique({
            where: { id },
            include: {
                workLogs: { orderBy: { timestamp: 'desc' } },
                reports: { orderBy: { timestamp: 'desc' }, take: 10 }
            }
        });
    }

    async promoteElf(id: string) {
        const elf = await prisma.elf.findUnique({ where: { id } });
        if (!elf) throw new Error("Elf not found");

        const newLevel = elf.level + 1;
        // Simple title progression
        let newTitle = elf.title;
        if (newLevel >= 2) newTitle = "Mid-Senior Elf";
        if (newLevel >= 4) newTitle = "Senior Elf";
        if (newLevel >= 6) newTitle = "Master Elf";
        if (newLevel >= 8) newTitle = "Elder Elf";

        // Award bonus points for promotion
        await this.awardPoints(id, 500, `Promoted to Level ${newLevel}: ${newTitle}`);

        return prisma.elf.update({
            where: { id },
            data: { 
                level: newLevel,
                title: newTitle
            }
        });
    }

    async terminateElf(id: string) {
        // In reality we might just set status to TERMINATED
        return prisma.elf.update({
            where: { id },
            data: { 
                status: 'TERMINATED',
                password: 'REVOKED__' + Date.now(),
                points: 0
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
