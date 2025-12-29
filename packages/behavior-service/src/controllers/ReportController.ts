
import { Request, Response } from 'express';
import { reportService } from '../services/ReportService';

export class ReportController {
    async getRecentEvents(req: Request, res: Response) {
        try {
            const events = await reportService.getRecentEvents();
            res.json(events);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    async createReport(req: Request, res: Response) {
        try {
            const result = await reportService.createReport(req.body, req.file);
            res.json(result);
        } catch (e: any) {
            console.error(e);
            console.error(e);
            res.status(500).json({ error: e.message || "Report failed", stack: e.stack });
        }
    }
}

export const reportController = new ReportController();
