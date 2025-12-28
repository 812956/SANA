import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

export const useSantaSystem = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [latestEvent, setLatestEvent] = useState<any>(null);
    const [stats] = useState({
        activeElves: 42,
        serverLoad: '12%',
        niceScore: 98,
        pendingOrders: 15,
        toysProduced: 8432
    });

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log("Connected to SantaNet Behavior Uplink");
        });

        socket.on('new-event', (event: any) => {
            setLatestEvent(event);
            setEvents(prev => [event, ...prev].slice(0, 50)); // Keep last 50
        });

        socket.on('child-updated', (updatedChild: any) => {
             // We can use this to trigger global updates if needed
             console.log("Child updated:", updatedChild.name);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return {
        events,
        latestEvent,
        stats
    };
};
