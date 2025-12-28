
import { Kafka, Producer, Consumer } from "kafkajs";

class KafkaService {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    private isConnected: boolean = false;
    private io: any;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'behavior-service',
            brokers: ['localhost:9092'],
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        });

        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'behavior-group' });
    }

    setSocketServer(io: any) {
        this.io = io;
    }

    async connect() {
        if (this.isConnected) return;
        try {
            await this.producer.connect();
            await this.consumer.connect();
            this.isConnected = true;
            console.log("Kafka Connected Successfully");
        } catch (e) {
            console.warn("Kafka Connection Failed (running in offline mode):", e);
        }
    }

    async sendEvent(event: any) {
        if (!this.isConnected) {
            console.warn("Kafka not connected, skipping event send (or using fallback if implemented elsewhere)");
            return; 
        }

        try {
            await this.producer.send({
                topic: 'sana-events',
                messages: [
                    { value: JSON.stringify(event) }
                ]
            });
        } catch (e) {
            console.error("Failed to send Kafka event", e);
            throw e;
        }
    }

    // Needed for other services to hook into if they want to consume
    async subscribe(topic: string, callback: (message: any) => void) {
        if (!this.isConnected) return;
        
        await this.consumer.subscribe({ topic, fromBeginning: false });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value?.toString();
                if (value) {
                    try {
                        const parsed = JSON.parse(value);
                        callback(parsed);
                    } catch (e) {
                        console.error("Error parsing Kafka message", e);
                    }
                }
            },
        });
    }
}

export const kafkaService = new KafkaService();
