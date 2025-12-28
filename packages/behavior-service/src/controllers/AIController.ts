
import { Request, Response } from 'express';
import { aiService } from '../services/AIService';

export class AIController {
    async processCommand(req: Request, res: Response) {
        try {
            const { text } = req.body;
             // Expecting { type, payload, action } response from service
            const response = await aiService.processCommand(text);
            res.json(response);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }
}

export const aiController = new AIController();
