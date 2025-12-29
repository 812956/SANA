const io = require('socket.io-client');

const SOCKET_URL = 'http://localhost:3001';

console.log('--- LISTENER STARTING ---');
const socket = io(SOCKET_URL);

socket.on('connect', () => {
    console.log('✅ LISTENER CONNECTED to', SOCKET_URL);
});

socket.on('new-event', (event) => {
    console.log('🎉 RECEIVED EVENT:', JSON.stringify(event, null, 2));
});

socket.on('connect_error', (err) => {
    console.log('❌ Connection Error:', err.message);
});
