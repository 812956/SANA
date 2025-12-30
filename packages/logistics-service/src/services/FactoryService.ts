
export interface Workbench {
    id: string;
    name: string;
    status: 'IDLE' | 'DESIGNING' | 'ASSEMBLING' | 'PAINTING' | 'QA' | 'WRAPPING';
    currentToy: string | null;
    progress: number; // 0-100
    efficiency: number; // multiplier
}

import prisma from '../config/prisma';
import axios from 'axios';

interface FactoryState {
    toysProduced: number;
    coalStockpiled: number;
    pendingOrders: number;
    activeElves: number;
    sleighBattery: number;
    workbenches: Workbench[];
}

export class FactoryService {
    private state: FactoryState = {
        toysProduced: 0,
        coalStockpiled: 0,
        pendingOrders: 0,
        activeElves: 0,
        sleighBattery: 100,
        workbenches: [
            { id: 'wb-1', name: 'Alpha Bench', status: 'IDLE', currentToy: null, progress: 0, efficiency: 1.2 },
            { id: 'wb-2', name: 'Beta Bench', status: 'IDLE', currentToy: null, progress: 0, efficiency: 0.9 },
            { id: 'wb-3', name: 'Gamma Bench', status: 'IDLE', currentToy: null, progress: 0, efficiency: 1.5 },
            { id: 'wb-4', name: 'Delta Bench', status: 'IDLE', currentToy: null, progress: 0, efficiency: 1.0 },
        ]
    };
    
    // Store online elf IDs
    private onlineElfIds: Set<string> = new Set();
    private factoryStatsId: string | null = null;
    private toysNeeded: number = 0;

    constructor() {
        this.init();
        // Start simulation loop
        setInterval(() => this.tick(), 1000);
        // Sync Demand Loop
        setInterval(() => this.syncDemand(), 5000);
        // Sync Workforce Loop
        setInterval(() => this.syncWorkforce(), 5000);
    }

    private async init() {
        // Find or create initial stats
        const stats = await prisma.factoryStats.findFirst();
        if (stats) {
            this.factoryStatsId = stats.id;
            this.state.toysProduced = stats.toysProduced;
            this.state.coalStockpiled = stats.coalStockpiled;
            console.log(`[FactoryService] Loaded existing stats: ${JSON.stringify(stats)}`);
        } else {
            const newStats = await prisma.factoryStats.create({
                data: { toysProduced: 0, coalStockpiled: 0 }
            });
            this.factoryStatsId = newStats.id;
            this.state.toysProduced = newStats.toysProduced;
            this.state.coalStockpiled = newStats.coalStockpiled;
            console.log(`[FactoryService] Created new stats: ${JSON.stringify(newStats)}`);
        }
        await this.syncDemand();
        await this.syncWorkforce();
    }

    private async syncDemand() {
        try {
            // Fetch Global Demand (Unique Children)
            const res = await axios.get('http://localhost:3001/api/reports/stats');
            if (res.data && typeof res.data.toysNeeded === 'number') {
                this.toysNeeded = res.data.toysNeeded;
            }
        } catch (error: any) {
            console.error("Failed to sync toy demand from Behavior Service:", error.message || error);
        }
    }

    private async syncWorkforce() {
        try {
            // Fetch Online Elves
            // Note: We use behavior-service port 3001
            const res = await axios.get('http://localhost:3001/api/elves?status=ONLINE&limit=100');
            if (res.data && Array.isArray(res.data.data)) {
                // Replace current set with fresh data from DB
                const onlineIds = res.data.data.map((e: any) => e.id);
                this.onlineElfIds = new Set(onlineIds);
                this.state.activeElves = this.onlineElfIds.size;
                // console.log(`[FactoryService] Synced Workforce: ${this.state.activeElves} elves online`);
            }
        } catch (error: any) {
            console.error("Failed to sync workforce from Behavior Service:", error.message || error);
        }
    }

    private tick() {
        // Update active count
        this.state.activeElves = this.onlineElfIds.size;
        
        // Calculate Real Pending Orders
        // Pending = Global Demand - Produced. Cannot be negative.
        this.state.pendingOrders = Math.max(0, this.toysNeeded - this.state.toysProduced);

        this.state.workbenches.forEach(wb => {
            if (wb.status === 'IDLE') {
                if (this.state.pendingOrders > 0) {
                    // Only start work if we actually need toys
                    // Optimistic decrement for local state to prevent all benches grabbing same job
                    // Real consistency check happens on completion loop ideally, but this is fine for simulation
                    this.state.pendingOrders--; 
                    wb.status = 'DESIGNING';
                    wb.currentToy = this.getRandomToy();
                    wb.progress = 0;
                }
            } else {
                wb.progress += (5 * wb.efficiency);
                if (wb.progress >= 100) {
                    this.advanceStage(wb);
                }
            }
        });
    }

    // ... (rest of tick logic helpers)

    private async advanceStage(wb: Workbench) {
        wb.progress = 0;
        switch (wb.status) {
            case 'DESIGNING': wb.status = 'ASSEMBLING'; break;
            case 'ASSEMBLING': wb.status = 'PAINTING'; break;
            case 'PAINTING': wb.status = 'QA'; break;
            case 'QA': wb.status = 'WRAPPING'; break;
            case 'WRAPPING': 
                wb.status = 'IDLE'; 
                wb.currentToy = null;
                // Increment Persistent State
                await this.incrementProduction();
                break;
            default: wb.status = 'IDLE';
        }
    }

    private async incrementProduction() {
        this.state.toysProduced++;
        // Sync to DB
        if (this.factoryStatsId) {
            await prisma.factoryStats.update({
                where: { id: this.factoryStatsId },
                data: { 
                    toysProduced: { increment: 1 }
                }
            });
        }
    }

    private getRandomToy() {
        const toys = ['Race Car', 'Doll', 'Puzzle', 'Game Console', 'Bicycle', 'Drum Set', 'Action Figure'];
        return toys[Math.floor(Math.random() * toys.length)];
    }

    clockIn(elfId: string) {
        this.onlineElfIds.add(elfId);
        return { success: true, activeElves: this.onlineElfIds.size };
    }

    clockOut(elfId: string) {
        this.onlineElfIds.delete(elfId);
        return { success: true, activeElves: this.onlineElfIds.size };
    }
    
    getOnlineElves() {
        return Array.from(this.onlineElfIds);
    }

    getStats() {
        // Simulate battery drain on read
        this.state.sleighBattery = Math.max(0, this.state.sleighBattery - 0.005);
        this.state.activeElves = this.onlineElfIds.size;
        
        // Recalculate pending just to be sure for UI
        const pending = Math.max(0, this.toysNeeded - this.state.toysProduced);
        
        return {
            ...this.state,
            pendingOrders: pending, // Return real pending calculation
            onlineElfIds: Array.from(this.onlineElfIds)
        };
    }

    processOrder() {
       // No-op or log, since we rely on syncDemand now.
    }

    approveOrder() {
        // Start production manually? 
        // For now, no-op as we are data driven.
        return { success: true, message: "Production is automated based on demand." };
    }

    // Called by Kafka Consumer
    handleAuthorization(name: string) {
       // No-op, we pull from Reports stats
    }

    handleCoal(name: string) {
        console.log(`[Factory] Stockpiling Coal for subject: ${name}`);
        this.state.coalStockpiled++;
        if (this.factoryStatsId) {
             prisma.factoryStats.update({
                where: { id: this.factoryStatsId },
                data: { coalStockpiled: { increment: 1 } }
            }).catch(console.error);
        }
    }

    handleEvent(event: any) {
        // Just log or handle coal
        if (event.type === 'NAUGHTY') {
            this.handleCoal(event.name);
        }
    }
}

export const factoryService = new FactoryService();
