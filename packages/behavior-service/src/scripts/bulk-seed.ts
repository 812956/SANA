import prisma from '../config/prisma';

// Sample data for generating realistic children
const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
    'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
    'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery', 'Sebastian',
    'Ella', 'Jack', 'Scarlett', 'Aiden', 'Grace', 'Owen', 'Chloe', 'Samuel', 'Victoria', 'David',
    'Riley', 'Joseph', 'Aria', 'Carter', 'Lily', 'Wyatt', 'Aubrey', 'John', 'Zoey', 'Luke'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const cities = [
    { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
    { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777 },
    { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333 },
    { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332 },
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
    { name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038 },
    { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
    { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
    { name: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522 },
    { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lng: 12.5683 },
    { name: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603 },
    { name: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738 }
];

const elfNames = [
    'Bernard', 'Jingle', 'Snowflake', 'Tinsel', 'Holly', 'Sparkle', 'Candy', 'Ginger',
    'Mistletoe', 'Frosty', 'Twinkle', 'Pepper', 'Nutmeg', 'Cinnamon', 'Cookie',
    'Sugarplum', 'Evergreen', 'Starlight', 'Blitzen', 'Comet'
];

const departments = [
    'Toy Making', 'Gift Wrapping', 'Sleigh Maintenance', 'Reindeer Care', 
    'Naughty/Nice List', 'Cookie Testing', 'Snow Management', 'Workshop Security'
];

const elfTitles = [
    'Junior Elf', 'Senior Elf', 'Master Elf', 'Chief Elf', 'Head Elf',
    'Toy Specialist', 'Gift Expert', 'Workshop Manager', 'Lead Engineer'
];

const badges = [
    'Veteran', 'Leader', 'ToyMaker', 'SpeedWrapper', 'PerfectRecord',
    'NightShift', 'Innovation', 'TeamPlayer', 'Dedication', 'Excellence'
];

function randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChild(index: number) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const city = randomElement(cities);
    const age = randomInt(5, 12);
    const behaviorScore = randomInt(20, 100);
    
    let status = 'NEUTRAL';
    if (behaviorScore >= 80) status = 'NICE';
    else if (behaviorScore < 40) status = 'NAUGHTY';
    
    return {
        name: `${firstName} ${lastName}`,
        age,
        status,
        location: `${city.name}, ${city.country}`,
        city: city.name,
        country: city.country,
        lat: city.lat + (Math.random() - 0.5) * 0.1, // Add slight variation
        lng: city.lng + (Math.random() - 0.5) * 0.1,
        behaviorScore,
        wishlist: randomElement([
            'Bicycle, Video Game, Books',
            'Doll, Art Supplies, Puzzle',
            'Robot, Science Kit, Telescope',
            'Soccer Ball, Skateboard, Headphones',
            'LEGO Set, Board Game, Action Figures'
        ])
    };
}

function generateElf(index: number) {
    const name = elfNames[index % elfNames.length] + (index >= elfNames.length ? ` ${Math.floor(index / elfNames.length) + 1}` : '');
    const agentId = `E${String(index + 1).padStart(3, '0')}`;
    const department = randomElement(departments);
    const level = randomInt(1, 10);
    const points = level * randomInt(100, 500);
    const title = level >= 8 ? 'Head Elf' : level >= 5 ? 'Senior Elf' : randomElement(elfTitles);
    
    const elfBadges: string[] = [];
    const badgeCount = randomInt(0, Math.min(level, 5));
    for (let i = 0; i < badgeCount; i++) {
        const badge = randomElement(badges);
        if (!elfBadges.includes(badge)) {
            elfBadges.push(badge);
        }
    }
    
    // Generate elf-themed avatar URL
    const seed = name.replace(/\s/g, '');
    const styles = ['notionists', 'adventurer', 'bottts', 'pixel-art'];
    const style = styles[index % styles.length];
    const bgColors = ['228b22', 'c41e3a', 'ffd700', '006400', '8b0000', '32cd32'];
    const backgroundColor = bgColors[index % bgColors.length];
    
    let avatarUrl;
    if (style === 'notionists' || style === 'adventurer') {
        avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}&radius=50`;
    } else {
        avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}&colors=228b22,c41e3a,ffd700`;
    }
    
    return {
        name,
        agentId,
        password: 'northpole123',
        title,
        level,
        department,
        points,
        status: 'OFFLINE', // All new elves start as OFFLINE
        badges: elfBadges,
        avatarUrl
    };
}

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to database');
        
        // Generate 100 children
        console.log('Creating 100 children...');
        const children = [];
        for (let i = 0; i < 100; i++) {
            children.push(generateChild(i));
        }
        
        // Batch create children
        let childrenCreated = 0;
        for (const child of children) {
            await prisma.child.create({ data: child });
            childrenCreated++;
            if (childrenCreated % 10 === 0) {
                console.log(`Created ${childrenCreated}/100 children...`);
            }
        }
        console.log(`✓ Successfully created ${childrenCreated} children`);
        
        // Generate 15 elves
        console.log('\nCreating 15 elves...');
        const elves = [];
        for (let i = 0; i < 15; i++) {
            elves.push(generateElf(i));
        }
        
        // Batch create elves
        let elvesCreated = 0;
        for (const elf of elves) {
            await prisma.elf.create({ data: elf });
            elvesCreated++;
            console.log(`Created elf ${elvesCreated}/15: ${elf.name} (${elf.agentId})`);
        }
        console.log(`✓ Successfully created ${elvesCreated} elves`);
        
        // Print summary
        const totalChildren = await prisma.child.count();
        const totalElves = await prisma.elf.count();
        
        console.log('\n=== Database Summary ===');
        console.log(`Total Children: ${totalChildren}`);
        console.log(`Total Elves: ${totalElves}`);
        console.log('========================\n');
        
        console.log('Bulk seeding completed successfully! 🎄');
        
    } catch (error) {
        console.error('Error during bulk seeding:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
