
import 'dotenv/config';

export const ENV = {
    PORT: 3001,
    KAFKA_BROKERS: (process.env.KAFKA_BROKERS || '127.0.0.1:19092').split(','),
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'behavior-service',
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'behavior-web-bridge',
};
