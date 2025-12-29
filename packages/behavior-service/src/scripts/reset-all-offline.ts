import prisma from '../config/prisma';

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database\n');
        
        // Set ALL elves to OFFLINE (except TERMINATED ones)
        const result = await prisma.elf.updateMany({
            where: {
                status: {
                    not: 'TERMINATED'
                }
            },
            data: {
                status: 'OFFLINE'
            }
        });
        
        console.log(`✓ Set ${result.count} elves to OFFLINE status`);
        
        // Show current status distribution
        const statusCounts = await prisma.elf.groupBy({
            by: ['status'],
            _count: true
        });
        
        console.log('\n=== Current Status Distribution ===');
        statusCounts.forEach(item => {
            console.log(`${item.status}: ${item._count}`);
        });
        console.log('====================================\n');
        
        console.log('All elves are now OFFLINE. They will turn ONLINE only when they actually log in.');
        
    } catch (error) {
        console.error('Error resetting statuses:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
