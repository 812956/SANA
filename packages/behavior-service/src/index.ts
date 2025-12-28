
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { childService } from './services/ChildService';
import { aiService } from './services/AIService';
import { elfController } from './controllers/ElfController';
import { authService } from './services/AuthService';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Seed Data on Start
childService.seedDatabase().then(() => console.log("Did Seeding"));
// Seed default Elf
authService.createElf({ 
    agentId: "elf1", 
    name: "Buddy the Elf", 
    password: "candy", 
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Buddy" 
}).catch(() => console.log("Elf already exists"));

// --- API ROUTES ---

// 1. Get Children (Database)
app.get('/api/children', async (req, res) => {
    try {
        const result = await childService.getChildren(req.query);
        res.json(result.data); // Sending array directly for simpler frontend compatibility initially
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 2. Get Single Child
app.get('/api/children/:id', async (req, res) => {
    try {
        const child = await childService.getChildById(req.params.id);
        res.json(child);
    } catch (e) {
        res.status(404).json({ error: "Child not found" });
    }
});

// 3. AI Command
app.post('/api/ai/command', async (req, res) => {
    try {
        const { text } = req.body;
        const result = await aiService.processCommand(text);
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 4. Create Child (for testing/seeding)
app.post('/api/children', async (req, res) => {
    try {
        const child = await childService.createChild(req.body);
        io.emit('new-child', child);
        res.json(child);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// --- ELF ROUTES ---
app.post('/api/elf/login', elfController.login);
app.get('/api/elf/profile/:id', elfController.getProfile);
app.get('/api/elf/children', elfController.getChildren);
app.get('/api/elf/children/:id', elfController.getChild);
app.post('/api/elf/report', (req, res) => {
    // Wrap to emit socket event after processing
    elfController.submitReport(req, res).then(() => {
        // We can emit 'new-report' here if needed for live map
         io.emit('child-update', { id: req.body.childId }); // trigger refresh
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Behavior Service (RECOVERED) running on port ${PORT}`);
});
