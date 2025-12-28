
import { Server, Socket } from "socket.io";
import prisma from "../config/prisma";

// Map to track socket -> elf relationships
const socketToElfMap = new Map<string, string>(); // socketId -> elfId

export const setupSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`[Socket] Client connected: ${socket.id}`);

        // Elf Identity Handshake
        socket.on('identify-elf', async (elfId: string) => {
            if (!elfId) return;

            console.log(`[Socket] Elf Identified: ${elfId} on ${socket.id}`);
            socketToElfMap.set(socket.id, elfId);

            // Update DB to ONLINE
            try {
                await prisma.elf.update({
                    where: { id: elfId },
                    data: { status: 'ONLINE', lastActive: new Date() }
                });

                // Broadcast status update
                io.emit('elf-status-update', { id: elfId, status: 'ONLINE' });
            } catch (e) {
                console.error("Failed to mark elf online", e);
            }
        });

        socket.on("disconnect", async () => {
            console.log(`[Socket] Client disconnected: ${socket.id}`);
            const elfId = socketToElfMap.get(socket.id);

            if (elfId) {
                console.log(`[Socket] Elf Disconnected: ${elfId}`);
                socketToElfMap.delete(socket.id);

                // Update DB to OFFLINE
                try {
                    await prisma.elf.update({
                        where: { id: elfId },
                        data: { status: 'OFFLINE', lastActive: new Date() }
                    });

                    // Broadcast status update
                    io.emit('elf-status-update', { id: elfId, status: 'OFFLINE' });

                } catch (e) {
                    console.error("Failed to mark elf offline", e);
                }
            }
        });
    });
};
