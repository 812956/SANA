
import prisma from "../config/prisma";

export class ChildService {
    async getAllChildren() {
        return await prisma.child.findMany({ orderBy: { name: 'asc' } });
    }

    async getChildren(query: any) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 50;
        const skip = (page - 1) * limit;
        const search = query.search || '';

        const where: any = {};
        
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { country: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [data, total] = await Promise.all([
            prisma.child.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' }
            }),
            prisma.child.count({ where })
        ]);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getChildById(id: string) {
        return await prisma.child.findUnique({ 
            where: { id },
            include: { reports: { orderBy: { timestamp: 'desc' }} } 
        });
    }

    async createChild(data: any) {
        return await prisma.child.create({ data });
    }

    async updateStatus(id: string, status: string) {
        return await prisma.child.update({
            where: { id },
            data: { status }
        });
    }

    async updateBehaviorScore(id: string, pointChange: number) {
        const child = await prisma.child.findUnique({ where: { id } });
        if (!child) throw new Error("Child not found");

        const newScore = Math.max(0, Math.min(100, child.behaviorScore + pointChange));
        
        // Determine new status based on score
        let newStatus = child.status;
        if (newScore >= 80) newStatus = 'NICE';
        else if (newScore < 40) newStatus = 'NAUGHTY';

        return await prisma.child.update({
            where: { id },
            data: { 
                behaviorScore: newScore,
                status: newStatus
            }
        });
    }

    async seedDatabase() {
        const count = await prisma.child.count();
        if (count > 0) return;
        
        console.log("Seeding Database...");
        await Promise.all([
            prisma.child.create({ data: { name: "Kevin McAllister", status: "NAUGHTY", behaviorScore: 35, location: "New York, USA", lat: 40.7128, lng: -74.0060, age: 10, city: "New York", country: "USA" } }),
            prisma.child.create({ data: { name: "Charlie Bucket", status: "NICE", behaviorScore: 95, location: "London, UK", lat: 51.5074, lng: -0.1278, age: 11, city: "London", country: "UK" } }),
            prisma.child.create({ data: { name: "Matilda Wormwood", status: "NICE", behaviorScore: 98, location: "Reading, UK", lat: 51.4543, lng: -0.9781, age: 7, city: "Reading", country: "UK" } })
        ]);
    }
}

export const childService = new ChildService();
