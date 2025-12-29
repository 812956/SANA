
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Elf...");
    const elf = await prisma.elf.upsert({
        where: { agentId: 'elf_001' },
        update: {},
        create: {
            agentId: 'elf_001',
            name: 'Sparkle McElfish',
            password: 'password123',
            status: 'OFFLINE',
            points: 100,
            level: 2,
            title: 'Gift Wrapper',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparkle'
        }
    });
    console.log("Elf seeded:", elf);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
