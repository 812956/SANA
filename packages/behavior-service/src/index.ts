
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { ENV } from './config/env';
import { setupSocket } from './services/SocketService';
import { kafkaService } from './services/KafkaService';
import { childService } from './services/ChildService';

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            callback(null, true);
        },
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Setup Services
setupSocket(io);
kafkaService.setSocketServer(io);

// Start Server
server.listen(ENV.PORT, async () => {
    console.log(`[Behavior Service] Server running on port ${ENV.PORT}`);
    
    // Initialize Systems
    try {
        await kafkaService.connect();
    } catch (e) {
        console.warn("Initial Kafka connect failed, continuing...", e);
    }
    
    try {
        if (childService.seedDatabase) {
             await childService.seedDatabase();
        }
    } catch (e) {
        console.warn("Seeding failed", e);
    }
});
