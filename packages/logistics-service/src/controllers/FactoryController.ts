
import { Request, Response } from 'express';
import { factoryService } from '../services/FactoryService';

export class FactoryController {
    getStats(req: Request, res: Response) {
        const stats = factoryService.getStats();
        res.json(stats);
    }

    processOrder(req: Request, res: Response) {
        factoryService.processOrder();
        res.json({ success: true });
    }

    approveOrder(req: Request, res: Response) {
        try {
            const result = factoryService.approveOrder();
            res.json(result);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }
}

export const factoryController = new FactoryController();
