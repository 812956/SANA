
import { Request, Response } from 'express';
import { authService } from '../services/AuthService';
import { childService } from '../services/ChildService';
import { elfService } from '../services/ElfService';
import { kafkaService } from '../services/KafkaService';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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

    async getElfById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const profile = await authService.getProfile(id); // Reusing authService logic
            if (!profile) return res.status(404).json({ error: "Elf not found" });
            res.json(profile);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getElves(req: Request, res: Response) {
        try {
            const { page, limit, search, level, department } = req.query;
            const params = {
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search as string,
                level: level as string,
                department: department as string
            };
            const result = await elfService.getAllElves(params);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async promoteElf(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const elf = await elfService.promoteElf(id);
            res.json(elf);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async terminateElf(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const elf = await elfService.terminateElf(id);
            res.json(elf);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createElf(req: Request, res: Response) {
        try {
            const elf = await elfService.createElf(req.body);
            res.json(elf);
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

            // Get child data for event
            const child = await prisma.child.findUnique({ where: { id: childId } });
            if (!child) return res.status(404).json({ error: "Child not found" });

            const oldStatus = child.status;

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

            // Get updated child for new status
            const updatedChild = await prisma.child.findUnique({ where: { id: childId } });

            // 3. Award Elf Points (Gamification)
            if (elfId) {
                const elfExists = await prisma.elf.findUnique({ where: { id: elfId } });
                if (elfExists) {
                    const elfPoints = 10; // 10 pts per report
                    await prisma.elf.update({
                        where: { id: elfId },
                        data: { 
                            points: { increment: elfPoints },
                            workLogs: {
                                create: {
                                    action: "REPORT",
                                    description: `Submitted ${type} report for child ${child.name}`,
                                    pointsEarned: elfPoints
                                }
                            }
                        }
                    });
                } else {
                    console.warn(`[ElfController] Warning: Reporter Elf ID ${elfId} not found in DB. Allocating report anonymously.`);
                }
            }

             // Check for Level Up (Simple logic: Level = Points / 100)
            if (elfId) {
                const updatedElf = await prisma.elf.findUnique({ where: { id: elfId } });
                if (updatedElf) {
                     const newLevel = Math.floor(updatedElf.points / 100) + 1;
                     if (newLevel > updatedElf.level) {
                         let newTitle = "Junior Elf";
                         if (newLevel >= 2 && newLevel <= 3) newTitle = "Mid-Senior Elf";
                         if (newLevel >= 4 && newLevel <= 5) newTitle = "Senior Elf";
                         if (newLevel >= 6) newTitle = "Santa's Right Hand";
    
                         await prisma.elf.update({
                             where: { id: elfId },
                             data: { level: newLevel, title: newTitle }
                         });
                     }
                }
            }

            // 4. Publish Kafka Event for Real-time Updates
            const requiresToy = (oldStatus !== 'NICE' && updatedChild?.status === 'NICE');
            const event = {
                id: uuidv4(),
                type,
                name: child.name,
                description,
                location: location || child.location,
                lat: lat || child.lat,
                lng: lng || child.lng,
                timestamp: new Date().toISOString(),
                requiresToy,
                childId,
                newStatus: updatedChild?.status || child.status
            };

            console.log('[ElfController] Publishing event to Kafka:', event);
            
            try {
                await kafkaService.sendEvent(event);
            } catch (e) {
                console.warn('[ElfController] Kafka send failed, fallback handled in KafkaService', e);
            }

            // 5. Return success
            res.json({ success: true, report });
            
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

export const elfController = new ElfController();
