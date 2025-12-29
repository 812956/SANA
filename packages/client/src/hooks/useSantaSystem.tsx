import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import type { SantaSystemStats } from '../types';

const SOCKET_URL = 'http://localhost:3001';
const API_URL = 'http://localhost:3002/api/stats';

export const useSantaSystem = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [latestEvent, setLatestEvent] = useState<any>(null);
    const [stats, setStats] = useState<SantaSystemStats | null>(null);

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Fetch Initial Events
        const fetchInitialEvents = async () => {
             try {
                const res = await fetch(`${SOCKET_URL}/api/events/recent`);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                }
             } catch (e) {
                console.error("Failed to fetch recent events", e);
             }
        };
        fetchInitialEvents();

        // Socket connection for events
        const socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'], // Prioritize websocket
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            autoConnect: true,
        });

        socket.on('connect', () => {
            console.log("✅ [Client] Connected to SantaNet Behavior Uplink:", socket.id);
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log("❌ [Client] Disconnected");
            setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
            console.error("❌ [Client] Socket Connection Error:", err.message);
            setIsConnected(false);
        });

        socket.on('new-event', (event: any) => {
            console.log('🎁 [Client] Received new-event:', event);
            setLatestEvent(event);
            setEvents(prev => {
                // Prevent duplicates if the event was just fetched via API
                if (prev.some(e => e.id === event.id)) return prev;
                return [event, ...prev].slice(0, 50);
            }); 
        });

        socket.on('heartbeat', (data: any) => {
            console.log('💓 [Client] Heartbeat:', data);
        });

        socket.on('child-updated', (updatedChild: any) => {
             console.log("Child updated:", updatedChild.name);
        });

        return () => {
            console.log("🔌 [Client] Disconnecting Socket");
            socket.disconnect();
        };
    }, []);

    // Polling for Factory Stats
    const fetchStats = async () => {
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch factory stats:", error);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 1000); 

        return () => clearInterval(interval);
    }, []);

    return {
        events,
        latestEvent,
        stats,
        isConnected,
        refresh: fetchStats
    };
};
