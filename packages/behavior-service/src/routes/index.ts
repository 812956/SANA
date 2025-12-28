
import { Router } from 'express';
import { childController } from '../controllers/ChildController';
import { elfController } from '../controllers/ElfController';
import { reportController } from '../controllers/ReportController';
import { locationController } from '../controllers/LocationController';
import { authController } from '../controllers/AuthController';
import { aiController } from '../controllers/AIController';
import { upload } from '../config/multer';

const router = Router();

// Location Routes
router.get('/locations', locationController.getLocations);

// Child Routes
router.get('/children', childController.getChildren);
router.post('/children', childController.createChild);
router.get('/children/:id', childController.getChildById);
router.post('/children/:id/status', childController.updateStatus);

// Elf Routes
router.get('/elves', elfController.getElves);
router.post('/elves', elfController.createElf);
router.get('/elves/:id', elfController.getElfById);

// Auth Routes
router.post('/auth/login', authController.login);

// Report Routes
router.get('/events/recent', reportController.getRecentEvents);
router.post('/reports', upload.single('media'), reportController.createReport);

// AI Routes
router.post('/ai/command', aiController.processCommand);

export default router;
