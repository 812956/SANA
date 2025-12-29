
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
        console.log('[KafkaService] Socket.IO server attached');
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

            // Heartbeat
            setInterval(() => {
                if (this.io) {
                    this.io.emit('heartbeat', { timestamp: Date.now() });
                }
            }, 5000);
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
                            console.log('[Kafka Consumer] Received event:', event.id);
                            
                            // NOTE: We now emit directly in sendEvent for lower latency.
                            // We do NOT emit here to avoid duplicates.
                            // if (this.io) {
                            //     this.io.emit('new-event', event);
                            // }
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
        // PRIORITY: Emit to Socket.IO immediately for real-time frontend updates
        if (this.io) {
            console.log('[KafkaService] Direct Emit to Socket.IO:', event.type);
            this.io.emit('new-event', event);
        }

        if (!this.isConnected) {
            console.warn("Kafka not connected, event handled via direct socket emit only");
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
            // Fallback handled by the direct emit above
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
