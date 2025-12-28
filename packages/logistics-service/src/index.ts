
import app from './app';
import { ENV } from './config/env';
import { kafkaService } from './services/KafkaService';

// Start Server
app.listen(ENV.PORT, async () => {
    console.log(`[Logistics Service] Factory System Online on Port ${ENV.PORT}`);
    try {
        await kafkaService.connect();
    } catch (e) {
        console.warn('Initial Kafka Connection Failed', e);
    }
});
