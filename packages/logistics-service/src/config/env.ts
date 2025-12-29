
import 'dotenv/config';

export const ENV = {
    PORT: process.env.PORT || 3002,
    KAFKA_BROKERS: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'logistics-service',
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'logistics-production-manager',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://mac:123@localhost:5432/sana_logistics?schema=public',
};
