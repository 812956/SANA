
import prisma from "../config/prisma";

export class ChildService {
    async getAllChildren() {
        return await prisma.child.findMany({ orderBy: { name: 'asc' } });
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

    async seedDatabase() {
        const count = await prisma.child.count();
        if (count > 0) return;
        
        console.log("Seeding Database...");
        await prisma.child.createMany({
            data: [
                { name: "Kevin McAllister", status: "NAUGHTY", behaviorScore: 35, location: "New York, USA", lat: 40.7128, lng: -74.0060, age: 10, city: "New York", country: "USA" },
                { name: "Charlie Bucket", status: "NICE", behaviorScore: 95, location: "London, UK", lat: 51.5074, lng: -0.1278, age: 11, city: "London", country: "UK" },
                { name: "Matilda Wormwood", status: "NICE", behaviorScore: 98, location: "Reading, UK", lat: 51.4543, lng: -0.9781, age: 7, city: "Reading", country: "UK" }
            ]
        });
    }
}

export const childService = new ChildService();
