import prisma from '../config/prisma';

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database\n');
        
        // Update all elves with BUSY or ACTIVE status to OFFLINE
        const result = await prisma.elf.updateMany({
            where: {
                OR: [
                    { status: 'BUSY' },
                    { status: 'ACTIVE' }
                ]
            },
            data: {
                status: 'OFFLINE'
            }
        });
        
        console.log(`✓ Updated ${result.count} elves from BUSY/ACTIVE to OFFLINE`);
        
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
        
    } catch (error) {
        console.error('Error cleaning up statuses:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
