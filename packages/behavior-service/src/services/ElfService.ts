
import prisma from "../config/prisma";

export class ElfService {
    async getElfById(id: string) {
        return await prisma.elf.findUnique({ where: { id } });
    }

    async getElves() {
        return await prisma.elf.findMany({ orderBy: { points: 'desc' } });
    }

    async createElf(data: any) {
        return await prisma.elf.create({ data });
    }

    async awardPoints(elfId: string, amount: number, reason: string) {
        const elf = await prisma.elf.findUnique({ where: { id: elfId } });
        if (!elf) throw new Error("Elf not found");

        const newPoints = elf.points + amount;

        // Level Up Logic
        let newLevel = elf.level;
        // Simple level logic: 100 points per level
        newLevel = Math.floor(newPoints / 100) + 1;

        await prisma.elf.update({
            where: { id: elfId },
            data: { points: newPoints, level: newLevel }
        });

        // Log the work? Assuming there's a WorkLog table or similar if previously implemented.
        // For now, just updating points/level is critical.
        return { newPoints, newLevel };
    }
}

export const elfService = new ElfService();
