
import { PrismaClient } from '@prisma/client';
import type { Server } from 'socket.io';

const prisma = new PrismaClient();

let io: Server | null = null;

export class AuthService {
    // Set the Socket.IO instance
    setSocketServer(socketServer: Server) {
        io = socketServer;
    }

    async login(identifier: string, password: string) {
        // Try to find elf by agentId first, then by name
        let elf = await prisma.elf.findUnique({
            where: { agentId: identifier }
        });

        // If not found by agentId, try finding by name
        if (!elf) {
            elf = await prisma.elf.findFirst({
                where: { name: identifier }
            });
        }

        if (!elf) {
            throw new Error("Elf not found");
        }

        if (elf.password !== password) {
            throw new Error("Invalid credentials");
        }

        // Update status to ONLINE
        const updatedElf = await prisma.elf.update({
            where: { id: elf.id },
            data: { status: "ONLINE", lastActive: new Date() }
        });

        // Emit socket event for real-time status update
        if (io) {
            io.emit('elf-status-update', { id: updatedElf.id, status: 'ONLINE' });
            console.log(`[AuthService] Emitted elf-status-update: ${updatedElf.name} is ONLINE`);
        }

        // Return elf profile (excluding password)
        const { password: _, ...profile } = updatedElf;
        return profile;
    }

    async logout(elfId: string) {
        const elf = await prisma.elf.findUnique({
            where: { id: elfId }
        });

        if (!elf) {
            throw new Error("Elf not found");
        }

        // Update status to OFFLINE
        const updatedElf = await prisma.elf.update({
            where: { id: elfId },
            data: { status: "OFFLINE", lastActive: new Date() }
        });

        // Emit socket event for real-time status update
        if (io) {
            io.emit('elf-status-update', { id: updatedElf.id, status: 'OFFLINE' });
            console.log(`[AuthService] Emitted elf-status-update: ${updatedElf.name} is OFFLINE`);
        }

        const { password: _, ...profile } = updatedElf;
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
