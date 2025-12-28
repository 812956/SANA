
import express from 'express';
import cors from 'cors';
import factoryRoutes from './routes/factory.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', factoryRoutes);

export default app;
