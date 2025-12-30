import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useSantaSystem } from '../hooks/useSantaSystem';
import { useSantaAI } from '../context/SantaAIContext';
import { EventConsole } from '../components/EventConsole';
import { TelemetryPanel } from '../components/TelemetryPanel';
import { ChildProfileModal } from '../components/ChildProfileModal';

// Fix Leaflet Default Icon Issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


// Atomic Map Controller
// listents to selectedChild and zooms instantly
// Uses useRef to prevent unnecessary flyTo triggers (Fixes "Shaking" bug)
const MapController = ({ location }: { location: { lat: number, lng: number } | null }) => {
    const map = useMap();
    const prevLoc = useRef<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        if (location) {
            // Only fly if location actually changed
            if (!prevLoc.current || prevLoc.current.lat !== location.lat || prevLoc.current.lng !== location.lng) {
                map.flyTo([location.lat, location.lng], 16, {
                    animate: true,
                    duration: 1.5 
                });
                prevLoc.current = location;
            }
        }
    }, [location, map]);
    
    // AI Control Integration
    const { registerTool, unregisterTool } = useSantaAI();
    
    useEffect(() => {
        console.log('[MapController] Component mounted, registering tools...');
        console.log('[MapController] Map instance:', map ? 'Available' : 'NOT AVAILABLE');
        
        registerTool('map_control', (params: any) => {
            console.log('[MapController] map_control tool called with params:', params);
            if (params.action === 'ZOOM_IN') {
                map.zoomIn();
            } else if (params.action === 'ZOOM_OUT') {
                map.zoomOut();
            } else if (params.action === 'PAN') {
                if (params.lat && params.lng) {
                     map.flyTo([params.lat, params.lng], params.zoom || 13);
                }
            }
        });

        registerTool('filter_children', async (params: any) => {
            console.log('[MapController] filter_children tool called with params:', params);
            if (params.search) {
                try {
                    let url = `http://localhost:3001/api/children?search=${encodeURIComponent(params.search)}`;
                    if (params.city) url += `&city=${encodeURIComponent(params.city)}`;
                    if (params.country) url += `&country=${encodeURIComponent(params.country)}`;

                    const res = await fetch(url);
                    const data = await res.json();
                    const results = Array.isArray(data) ? data : data.data;
                    
                    if (results && results.length > 0) {
                        const target = results[0];
                        window.dispatchEvent(new CustomEvent('santa-map-locate', { detail: target }));
                        map.flyTo([target.lat || 51.5074, target.lng || -0.1278], 18, { animate: true, duration: 2 });
                    } 
                } catch (e) {
                    console.error("Search failed", e);
                }
            }
        });

        console.log('[MapController] ✅ Tools registered successfully');

        return () => {
            console.log('[MapController] Component unmounting, unregistering tools...');
            unregisterTool('map_control');
            unregisterTool('filter_children');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]); // Only depend on map instance, not registerTool/unregisterTool

    return null;
};

export const InteractiveMap = () => {
    const { events, latestEvent } = useSantaSystem();
    // Live Event Transient State
    const [blips, setBlips] = useState<any[]>([]);
    
    // ATOMIC STATE: One source of truth for "Who is selected"
    const [selectedChild, setSelectedChild] = useState<any | null>(null);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Blip Effect & Child Status Update on New Event
    useEffect(() => {
        if (latestEvent && latestEvent.lat && latestEvent.lng) {
            console.log('[InteractiveMap] Processing event:', latestEvent);
            
            // 1. Create Blip
            const blipId = Date.now();
            setBlips(prev => [...prev, { ...latestEvent, blipId }]);
            setTimeout(() => setBlips(prev => prev.filter(b => b.blipId !== blipId)), 5000); // Extended duration 5s
        }
    }, [latestEvent]);

    // Listen for AI Search Events
    useEffect(() => {
        const handleLocate = (e: any) => {
            const child = e.detail;
            if (child) {
                 setSelectedChild({
                    ...child,
                    id: child.id,
                    lat: child.lat || 51.5074, 
                    lng: child.lng || -0.1278,
                     naughtyScore: child.behaviorScore > 50 ? 20 : 80,
                     wishlist: child.wishlist || 'Scanning...'
                 });
                 setToast({ message: `LOCATED: ${child.name}`, type: 'success' });
            }
        };
        window.addEventListener('santa-map-locate', handleLocate);
        return () => window.removeEventListener('santa-map-locate', handleLocate);
    }, []);

    // ATOMIC INTERACTION HANDLER
    // Directly uses the event data to set the selected child/target
    const handleEventClick = (event: any) => {
        setSelectedChild({
            ...event,
            id: event.childId || event.id || 'unknown', // Fallback if ID is missing
            lat: event.lat,
            lng: event.lng,
            naughtyScore: event.type === 'NAUGHTY' ? 80 : 20, // Estimate based on event
            wishlist: 'Live Event - Analyzing...'
        });
    };

    // ACTION HANDLER
    const handleUpdateStatus = async (status: 'NICE' | 'NAUGHTY') => {
        if (!selectedChild || !selectedChild.id) return;

        // Feedback
        setToast({ 
            message: `PROCESSING: ${selectedChild.name} marked as ${status}...`, 
            type: status === 'NICE' ? 'success' : 'error' 
        });
        setTimeout(() => setToast(null), 3000);

        try {
            await fetch(`http://localhost:3001/api/children/${selectedChild.id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            
            // Optimistic Update
            setSelectedChild((prev: any) => prev ? ({ ...prev, status, naughtyScore: status === 'NICE' ? 0 : 100 }) : null);
            
            // Success Feedback
            setToast({ 
                message: `CONFIRMED: ${selectedChild.name} is now on the ${status} LIST.`, 
                type: status === 'NICE' ? 'success' : 'error' 
            });
            setTimeout(() => setToast(null), 4000);

        } catch (e) {
            console.error("Failed to update status", e);
            setToast({ message: "SYSTEM ERROR: Update Failed", type: 'error' });
        }
    };

    return (
        <div className="h-full w-full relative">
             <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} className="h-full w-full bg-santa-midnight/50" style={{ background: 'transparent' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Controller bound to Selected Child's Location */}
                <MapController location={selectedChild ? { lat: selectedChild.lat, lng: selectedChild.lng } : null} />

                {/* TARGET LOCK: Selected Child (YELLOW/GOLD Persistent Marker) */}
                {selectedChild && (
                    <Marker 
                        position={[selectedChild.lat, selectedChild.lng]}
                        icon={goldIcon} // USER REQ: Yellow for selected
                        zIndexOffset={3000}
                    >
                         <Popup className="font-orbitron glass-popup" autoClose={false} closeOnClick={false}>
                            <div className="font-bold flex items-center gap-2">
                                TARGET LOCKED
                                <span className="w-2 h-2 rounded-full animate-ping bg-santa-gold" />
                            </div>
                            <div className="text-xs">{selectedChild.name}</div>
                        </Popup>
                    </Marker>
                )}

                {/* TRANSIENT LIVE EVENTS (Green/Red Markers for 5s) */}
                {blips.map(blip => (
                    <Marker 
                        key={blip.blipId}
                        position={[blip.lat, blip.lng]}
                        icon={blip.type === 'NICE' ? greenIcon : redIcon}
                        zIndexOffset={2000}
                    >
                        {/* Optional: No Popup needed for transient, just the visual marker */}
                    </Marker>
                ))}
            </MapContainer>
            
            {/* Legend Overlay */}
            <div className="absolute top-4 right-4 glass-panel p-4 rounded-xl text-xs z-[1000] hidden md:block">
                <h3 className="text-santa-gold mb-2 font-bold font-orbitron tracking-wider">LEGEND</h3>
                <div className="flex items-center gap-2 mb-1 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-santa-green shadow-[0_0_8px_rgba(22,91,51,0.6)]"></div> Nice List
                </div>
                <div className="flex items-center gap-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-santa-red shadow-[0_0_8px_rgba(212,36,38,0.6)]"></div> Naughty List
                </div>
            </div>


            {/* Live Event Console */}
            <EventConsole events={events} onEventClick={handleEventClick} />

            {/* Child Profile Modal (Atomic State) */}
            <ChildProfileModal 
                child={selectedChild} 
                onClose={() => setSelectedChild(null)}
                onApprove={() => handleUpdateStatus('NICE')}
                onReview={() => handleUpdateStatus('NAUGHTY')}
            />

            {/* Bottom Telemetry Bar */}
            <TelemetryPanel />

            {/* Toast Notification Layer */}
            {toast && (
                <div className={`absolute top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg border backdrop-blur-xl shadow-2xl z-[3000] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 font-bold tracking-wide ${
                    toast.type === 'success' ? 'bg-santa-green/90 border-santa-green text-white' : 'bg-santa-red/90 border-santa-red text-white'
                }`}>
                    {toast.type === 'success' ? <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                    {toast.message}
                </div>
            )}
        </div>
    );
};
