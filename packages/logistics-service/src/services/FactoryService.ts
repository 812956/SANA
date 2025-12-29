
export interface Workbench {
    id: string;
    name: string;
    status: 'IDLE' | 'DESIGNING' | 'ASSEMBLING' | 'PAINTING' | 'QA' | 'WRAPPING';
    currentToy: string | null;
    progress: number; // 0-100
    efficiency: number; // multiplier
}

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
        toysProduced: 84320,
        coalStockpiled: 1200,
        pendingOrders: 5,
        activeElves: 450,
        sleighBattery: 100,
        workbenches: [
            { id: 'wb-1', name: 'Alpha Bench', status: 'ASSEMBLING', currentToy: 'Wooden Train', progress: 45, efficiency: 1.2 },
            { id: 'wb-2', name: 'Beta Bench', status: 'PAINTING', currentToy: 'Dollhouse', progress: 80, efficiency: 0.9 },
            { id: 'wb-3', name: 'Gamma Bench', status: 'DESIGNING', currentToy: 'Robot Kit', progress: 10, efficiency: 1.5 },
            { id: 'wb-4', name: 'Delta Bench', status: 'WRAPPING', currentToy: 'Plush Bear', progress: 95, efficiency: 1.0 },
        ]
    };

    constructor() {
        // Start simulation loop
        setInterval(() => this.tick(), 1000);
    }

    private tick() {
        this.state.workbenches.forEach(wb => {
            if (wb.status === 'IDLE') {
                if (this.state.pendingOrders > 0) {
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

    private advanceStage(wb: Workbench) {
        wb.progress = 0;
        switch (wb.status) {
            case 'DESIGNING': wb.status = 'ASSEMBLING'; break;
            case 'ASSEMBLING': wb.status = 'PAINTING'; break;
            case 'PAINTING': wb.status = 'QA'; break;
            case 'QA': wb.status = 'WRAPPING'; break;
            case 'WRAPPING': 
                wb.status = 'IDLE'; 
                wb.currentToy = null;
                this.state.toysProduced++;
                break;
            default: wb.status = 'IDLE';
        }
    }

    private getRandomToy() {
        const toys = ['Race Car', 'Doll', 'Puzzle', 'Game Console', 'Bicycle', 'Drum Set', 'Action Figure'];
        return toys[Math.floor(Math.random() * toys.length)];
    }

    getStats() {
        // Simulate battery drain on read
        this.state.sleighBattery = Math.max(0, this.state.sleighBattery - 0.005);
        return this.state;
    }

    processOrder() {
        // Legacy Webhook Logic - just adds to pending
        this.state.pendingOrders++;
    }

    approveOrder() {
        // Manually trigger a start if needed, or just add more capacity/orders
        // For now, let's just add to pending orders to fuel the machines
        this.state.pendingOrders += 5;
        return { success: true, remaining: this.state.pendingOrders };
    }

    // Called by Kafka Consumer
    handleAuthorization(name: string) {
        console.log(`[Factory] AUTHORIZED PRODUCTION for subject: ${name}`);
        this.state.pendingOrders++; // Simulate work queue
    }

    handleCoal(name: string) {
        console.log(`[Factory] Stockpiling Coal for subject: ${name}`);
        this.state.coalStockpiled++;
    }

    handleEvent(event: any) {
        if (event.requiresToy) {
            this.handleAuthorization(event.name);
        } else if (event.type === 'NAUGHTY') {
            this.handleCoal(event.name);
        } else {
             console.log(`[Factory] Event received for ${event.name}, but no production authorized.`);
        }
    }
}

export const factoryService = new FactoryService();
