
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
            
            // Start consuming events and emit to Socket.IO
            await this.startConsuming();
        } catch (e) {
            console.warn("Kafka Connection Failed (running in offline mode):", e);
        }
    }

    private async startConsuming() {
        if (!this.isConnected) return;
        
        try {
            await this.consumer.subscribe({ topic: 'sana-events', fromBeginning: false });
            
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value?.toString();
                    if (value) {
                        try {
                            const event = JSON.parse(value);
                            console.log('[Kafka Consumer] Received event:', event);
                            
                            // Emit to all connected Socket.IO clients
                            if (this.io) {
                                this.io.emit('new-event', event);
                                console.log('[Socket.IO] Broadcasted new-event to all clients');
                            }
                        } catch (e) {
                            console.error("Error parsing Kafka message", e);
                        }
                    }
                },
            });
            
            console.log('[Kafka Consumer] Started consuming sana-events topic');
        } catch (e) {
            console.error('[Kafka Consumer] Failed to start consuming:', e);
        }
    }

    async sendEvent(event: any) {
        if (!this.isConnected) {
            console.warn("Kafka not connected, emitting directly via Socket.IO as fallback");
            // Fallback: emit directly to Socket.IO if Kafka is down
            if (this.io) {
                this.io.emit('new-event', event);
            }
            return; 
        }

        try {
            await this.producer.send({
                topic: 'sana-events',
                messages: [
                    { value: JSON.stringify(event) }
                ]
            });
            console.log('[Kafka Producer] Event sent to sana-events topic');
        } catch (e) {
            console.error("Failed to send Kafka event", e);
            // Fallback: emit directly to Socket.IO
            if (this.io) {
                this.io.emit('new-event', event);
            }
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
