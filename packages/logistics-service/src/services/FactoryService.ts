
interface FactoryState {
    toysProduced: number;
    coalStockpiled: number;
    pendingOrders: number;
    activeElves: number;
    sleighBattery: number;
}

export class FactoryService {
    private state: FactoryState = {
        toysProduced: 84320,
        coalStockpiled: 1200,
        pendingOrders: 0,
        activeElves: 450,
        sleighBattery: 100
    };

    getStats() {
        // Simulate battery drain on read
        this.state.sleighBattery = Math.max(0, this.state.sleighBattery - 0.005);
        return this.state;
    }

    processOrder() {
        // Legacy Webhook Logic
        if (Math.random() > 0.8) {
            this.state.pendingOrders++;
        } else {
            this.state.toysProduced++;
        }
    }

    approveOrder() {
        if (this.state.pendingOrders > 0) {
            this.state.pendingOrders--;
            this.state.toysProduced++;
            return { success: true, remaining: this.state.pendingOrders };
        } else {
            throw new Error("No pending orders");
        }
    }

    // Called by Kafka Consumer
    handleAuthorization(name: string) {
        console.log(`[Factory] AUTHORIZED PRODUCTION for subject: ${name}`);
        this.state.toysProduced++;
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
