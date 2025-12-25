const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

let state = {
    toysProduced: 84320,
    coalStockpiled: 1200,
    pendingOrders: 0, // Orders waiting for Santa's click
    activeElves: 450,
    sleighBattery: 100
};

// --- Kafka Consumer ---
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'logistics-service',
  brokers: ['localhost:19092'],
});

const consumer = kafka.consumer({ groupId: 'logistics-group' });

const runConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'child.events', fromBeginning: false });
    console.log('[Kafka] Logistics Consumer Connected');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        // console.log(`[Kafka] Processing order for ${event.name}`);
        
        // Process Logic
        if (Math.random() > 0.8) {
            state.pendingOrders++;
        } else {
            state.toysProduced++;
        }
      },
    });
  } catch (e) {
    console.error('[Kafka] Consumer Error', e);
    setTimeout(runConsumer, 5000); // Retry
  }
};
runConsumer();


// --- API Endpoints ---

app.post('/api/process-order', (req, res) => {
    // Legacy Webhook (Kept for compatibility)
    if (Math.random() > 0.8) state.pendingOrders++;
    else state.toysProduced++;
    res.json({ success: true });
});

// NEW: Manual Approval Endpoint
app.post('/api/factory/approve', (req, res) => {
    if (state.pendingOrders > 0) {
        state.pendingOrders--;
        state.toysProduced++;
        res.json({ success: true, remaining: state.pendingOrders });
    } else {
        res.status(400).json({ error: "No pending orders" });
    }
});

app.get('/api/stats', (req, res) => {
    state.sleighBattery = Math.max(0, state.sleighBattery - 0.005);
    res.json(state);
});

app.listen(PORT, () => {
    console.log(`[Logistics Service] Factory System Online on Port ${PORT}`);
});
