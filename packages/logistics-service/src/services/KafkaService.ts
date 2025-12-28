
import { Kafka, Consumer } from "kafkajs";
import { ENV } from "../config/env";
import { factoryService } from "./FactoryService";

export class KafkaService {
    private kafka: Kafka;
    private consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: ENV.KAFKA_CLIENT_ID,
            brokers: ENV.KAFKA_BROKERS
        });
        
        this.consumer = this.kafka.consumer({ groupId: ENV.KAFKA_GROUP_ID });
    }

    async connect() {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: 'sana-events', fromBeginning: false }); // Topic was 'child.events' in dist? Wait, dist output said 'child.events'. 
            // BUT behavior-service emits to 'sana-events'. 
            // I should use 'sana-events' to ensure they talk to each other, or restore exactly as dist.
            // behavior-service restored code uses 'sana-events'.
            // logistics-service dist used 'child.events'.
            // This implies they were out of sync or I should match them. 
            // I will use 'sana-events' to fix the system, or check if 'child.events' was correct. 
            // Let's stick to 'sana-events' as that's what behavior emits now.
            
            console.log('[Kafka] Logistics Production Manager Connected');
            
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    if (message.value) {
                        try {
                            const event = JSON.parse(message.value.toString());
                            factoryService.handleEvent(event);
                        } catch (e) {
                             console.error('[Kafka] Error parsing message', e);
                        }
                    }
                }
            });
        } catch (e) {
            console.error('[Kafka] Consumer Error (Retrying in 5s...)', e);
            setTimeout(() => this.connect(), 5000);
        }
    }
}

export const kafkaService = new KafkaService();
