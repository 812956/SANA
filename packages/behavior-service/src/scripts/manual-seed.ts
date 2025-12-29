
import { childService } from '../services/ChildService';
import prisma from '../config/prisma';

async function main() {
    try {
        await prisma.$connect();
        
        // Seed Children
        console.log("Seeding Children...");
        await childService.seedDatabase();

        // Seed Default Elf
        const elfCount = await prisma.elf.count();
        if (elfCount === 0) {
            console.log("Seeding Default Elf...");
            await prisma.elf.create({
                data: {
                    name: "Bernard",
                    agentId: "E001",
                    password: "northpole123",
                    title: "Head Elf",
                    level: 10,
                    department: "Management",
                    points: 5000,
                    status: "OFFLINE",
                    badges: ["Veteran", "Leader", "ToyMaker"], // Array format as per Prisma schema
                    avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Bernard&backgroundColor=228b22&radius=50"
                }
            });
            console.log("Default Elf 'Bernard' (E001/northpole123) created.");
        } else {
             console.log("Elves already exist.");
        }

        console.log("Seeding process finished.");
    } catch (e) {
        console.error("Seeding failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
