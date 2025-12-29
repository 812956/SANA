import prisma from '../config/prisma';

// Generate elf-themed avatar URLs using DiceBear API
// Using styles that look more like characters/elves rather than random people
function getElfAvatarUrl(elfName: string, index: number): string {
    // Create a unique seed based on elf name
    const seed = elfName.replace(/\s/g, '');
    
    // Use "notionists" or "adventurer" style which creates character-like avatars
    // These look more like fantasy characters/elves than realistic people
    const styles = ['notionists', 'adventurer', 'bottts', 'pixel-art'];
    const style = styles[index % styles.length];
    
    // Elf-themed background colors (Christmas green, red, gold, dark green)
    const bgColors = ['228b22', 'c41e3a', 'ffd700', '006400', '8b0000', '32cd32'];
    const backgroundColor = bgColors[index % bgColors.length];
    
    // For notionists and adventurer, we can add more customization
    if (style === 'notionists' || style === 'adventurer') {
        return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}&radius=50`;
    }
    
    // For bottts and pixel-art, use different color schemes
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}&colors=228b22,c41e3a,ffd700`;
}

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database\n');
        
        // Get all elves
        const elves = await prisma.elf.findMany({
            orderBy: { agentId: 'asc' }
        });
        
        console.log(`Found ${elves.length} elves to update\n`);
        
        // Update each elf's avatar
        let updated = 0;
        for (let i = 0; i < elves.length; i++) {
            const elf = elves[i];
            const newAvatarUrl = getElfAvatarUrl(elf.name, i);
            
            await prisma.elf.update({
                where: { id: elf.id },
                data: { avatarUrl: newAvatarUrl }
            });
            
            console.log(`✓ Updated ${elf.name} (${elf.agentId})`);
            console.log(`  New avatar: ${newAvatarUrl}\n`);
            updated++;
        }
        
        console.log(`\n=== Summary ===`);
        console.log(`Successfully updated ${updated} elf avatars! 🎄`);
        console.log(`===============\n`);
        
    } catch (error) {
        console.error('Error updating elf avatars:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
