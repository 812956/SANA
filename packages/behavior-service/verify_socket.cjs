
const io = require('socket.io-client');

const socket = io('http://localhost:3001');

console.log('Connecting to socket server...');

socket.on('connect', () => {
    console.log('Connected to server!');
});

socket.on('new-event', (data) => {
    console.log('RECEIVED EVENT:', JSON.stringify(data, null, 2));
    process.exit(0); // Exit successfully on receiving event
});

socket.on('heartbeat', (data) => {
    console.log('RECEIVED HEARTBEAT:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});

// Timeout after 30 seconds
setTimeout(() => {
    console.log('Timeout waiting for event');
    process.exit(1);
}, 30000);
