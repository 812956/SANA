import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// --- DATA ---
const CITIES = [
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, tz: "JST" },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060, tz: "EST" },
    { name: "London, UK", lat: 51.5074, lng: -0.1278, tz: "GMT" },
    { name: "Paris, France", lat: 48.8566, lng: 2.3522, tz: "CET" },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, tz: "AEDT" },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729, tz: "BRT" },
    { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, tz: "EET" },
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, tz: "IST" },
    { name: "Moscow, Russia", lat: 55.7558, lng: 37.6173, tz: "MSK" },
    { name: "Beijing, China", lat: 39.9042, lng: 116.4074, tz: "CST" }
];

const NAMES = ["Timmy", "Sally", "Billy", "Alice", "Ralph", "Zoe", "Kevin", "Maria"];

// Generate initial database
let CHILDREN = Array.from({ length: 50 }).map(() => {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    return {
        id: uuidv4(),
        name: NAMES[Math.floor(Math.random() * NAMES.length)] + " " + Math.floor(Math.random() * 100),
        status: Math.random() > 0.5 ? 'NICE' : 'NAUGHTY',
        location: city.name,
        lat: city.lat + (Math.random() * 0.1 - 0.05), // Slight scatter
        lng: city.lng + (Math.random() * 0.1 - 0.05),
        naughtyScore: Math.floor(Math.random() * 100)
    };
});

// --- API ---

// GET /api/children
app.get('/api/children', (req, res) => {
    // Return all children
    res.json(CHILDREN);
});

// POST /api/children/:id/status
app.post('/api/children/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const childIndex = CHILDREN.findIndex(c => c.id === id);
    if (childIndex > -1) {
        CHILDREN[childIndex].status = status;
        CHILDREN[childIndex].naughtyScore = status === 'NICE' ? 0 : 100;
        
        // Emit update
        io.emit('child-updated', CHILDREN[childIndex]);
        
        console.log(`[UPDATE] Child ${CHILDREN[childIndex].name} is now ${status}`);
        res.json({ success: true, child: CHILDREN[childIndex] });
    } else {
        res.status(404).json({ error: "Child not found" });
    }
});

app.get('/health', (req, res) => res.send('OK'));

// --- SIMULATION ---
// Emit random events every few seconds to simulate live traffic
setInterval(() => {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const event = {
        id: uuidv4(),
        type: 'SCAN_COMPLETE',
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        lat: city.lat + (Math.random() * 0.1 - 0.05),
        lng: city.lng + (Math.random() * 0.1 - 0.05),
        timestamp: new Date().toISOString()
    };
    
    io.emit('new-event', event);
}, 3000);


const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Behavior Service (V4.2) running on port ${PORT}`);
    console.log(`- Fixed Map Coordinates Active`);
});
