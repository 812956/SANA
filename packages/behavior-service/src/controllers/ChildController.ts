
import { Request, Response } from 'express';
import { childService } from '../services/ChildService';

export class ChildController {
    async getChildren(req: Request, res: Response) {
        try {
            const result = await childService.getAllChildren(); // Changed to getAllChildren based on Service restoration
            res.json(result);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    async getChildById(req: Request, res: Response) {
        try {
            const child = await childService.getChildById(req.params.id);
            if (!child) return res.status(404).json({ error: "Not found" });
            res.json(child);
        } catch (e: any) {
             res.status(500).json({ error: e.message });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const child = await childService.updateStatus(id, status);
            res.json(child);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    async createChild(req: Request, res: Response) {
        try {
            const newChild = await childService.createChild(req.body);
            res.json(newChild);
        } catch (e: any) {
            console.error("Create child failed:", e);
            res.status(500).json({ error: e.message });
        }
    }
}

export const childController = new ChildController();
