
import { Request, Response } from 'express';
import { elfService } from '../services/ElfService';

export class ElfController {
    async getElves(req: Request, res: Response) {
        try {
            const result = await elfService.getElves();
            res.json(result);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    async getElfById(req: Request, res: Response) {
        try {
            const elf = await elfService.getElfById(req.params.id);
            if (!elf) return res.status(404).json({ error: "Elf not found" });
            res.json(elf);
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    async createElf(req: Request, res: Response) {
        try {
            const elf = await elfService.createElf(req.body);
            res.json(elf);
        } catch (e: any) {
             if (e.message === "Missing fields") res.status(400).json({ error: "Missing fields" });
             else res.status(500).json({ error: e.message });
        }
    }
}

export const elfController = new ElfController();
