
import { Router } from 'express';
import { factoryController } from '../controllers/FactoryController';

const router = Router();

router.get('/stats', factoryController.getStats);
router.post('/process-order', factoryController.processOrder);
router.post('/factory/approve', factoryController.approveOrder);

export default router;
