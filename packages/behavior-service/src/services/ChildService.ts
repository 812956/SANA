
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChildService {
    async getChildren(query: any = {}) {
        const { search, status, city, country } = query;
        const where: any = {};
        
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { country: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (status) where.status = status;
        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (country) where.country = { contains: country, mode: 'insensitive' };

        const children = await prisma.child.findMany({
            where,
            orderBy: { name: 'asc' },
            include: { reports: { orderBy: { timestamp: 'desc' }, take: 5 } }
        });

        return { data: children, total: children.length };
    }

    async getChildById(id: string) {
        return prisma.child.findUnique({
            where: { id },
            include: { 
                reports: { orderBy: { timestamp: 'desc' } } 
            }
        });
    }

    async createChild(data: any) {
        // Simple geocoding placeholder - for a real app we'd use a service
        const lat = data.lat || 0;
        const lng = data.lng || 0;

        return prisma.child.create({
            data: {
                ...data,
                lat,
                lng,
                behaviorScore: 50, // Starts neutral
                status: data.status || "NEUTRAL"
            }
        });
    }

    async updateBehaviorScore(childId: string, change: number) {
        const child = await prisma.child.findUnique({ where: { id: childId } });
        if (!child) throw new Error("Child not found");

        let newScore = child.behaviorScore + change;
        if (newScore > 100) newScore = 100;
        if (newScore < 0) newScore = 0;

        let newStatus = child.status;
        if (newScore >= 80) newStatus = "NICE";
        else if (newScore <= 20) newStatus = "NAUGHTY";
        else newStatus = "NEUTRAL";

        return prisma.child.update({
            where: { id: childId },
            data: { 
                behaviorScore: newScore,
                status: newStatus
            }
        });
    }

    async seedDatabase() {
        const count = await prisma.child.count();
        if (count > 0) return;

        console.log("Seeding initial children...");
        await prisma.child.createMany({
            data: [
                { name: "Timmy Turner", age: 10, city: "Dimmsdale", country: "USA", lat: 37.77, lng: -122.41, status: "NEUTRAL", behaviorScore: 50, location: "Home" },
                { name: "Vicky", age: 16, city: "Dimmsdale", country: "USA", lat: 37.78, lng: -122.42, status: "NAUGHTY", behaviorScore: 10, location: "Home" },
                { name: "Chester McBadbat", age: 10, city: "Dimmsdale", country: "USA", lat: 37.76, lng: -122.40, status: "NICE", behaviorScore: 90, location: "Trailer Park" }
            ]
        });
    }
}

export const childService = new ChildService();
