
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
    async login(agentId: string, password: string) {
        const elf = await prisma.elf.findUnique({
            where: { agentId }
        });

        if (!elf) {
            throw new Error("Elf not found");
        }

        if (elf.password !== password) {
            throw new Error("Invalid credentials");
        }

        // Update status to ONLINE
        await prisma.elf.update({
            where: { id: elf.id },
            data: { status: "ONLINE", lastActive: new Date() }
        });

        // Return elf profile (excluding password in real scenario, but keeping it simple here)
        const { password: _, ...profile } = elf;
        return profile;
    }

    async getProfile(elfId: string) {
        return prisma.elf.findUnique({
            where: { id: elfId },
            include: { 
                workLogs: { orderBy: { timestamp: 'desc' }, take: 20 },
                reports: { orderBy: { timestamp: 'desc' }, take: 10 }
            }
        });
    }

    async createElf(data: any) {
        return prisma.elf.create({
            data: {
                ...data,
                points: 0,
                level: 1,
                title: "Junior Elf",
                status: "OFFLINE"
            }
        });
    }
}

export const authService = new AuthService();
