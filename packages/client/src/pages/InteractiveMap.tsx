import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useSantaSystem } from '../hooks/useSantaSystem';
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
                map.flyTo([location.lat, location.lng], 13, {
                    animate: true,
                    duration: 1.5 
                });
                prevLoc.current = location;
            }
        }
    }, [location, map]);
    return null;
};

export const InteractiveMap = () => {
    const [children, setChildren] = useState<any[]>([]);
    const { events, latestEvent } = useSantaSystem();
    const [blips, setBlips] = useState<any[]>([]);
    
    // ATOMIC STATE: One source of truth for "Who is selected"
    const [selectedChild, setSelectedChild] = useState<any | null>(null);

    // Toast State
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Initial Load of Children
    const refreshChildren = () => {
        fetch('http://localhost:3001/api/children?limit=1000')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setChildren(data);
                else if (data.data && Array.isArray(data.data)) setChildren(data.data);
            })
            .catch(err => console.error("Failed to load children", err));
    };

    useEffect(() => {
        refreshChildren();
    }, []);

    // Blip Effect on New Event
    useEffect(() => {
        if (latestEvent && latestEvent.lat && latestEvent.lng) {
            const blipId = Date.now();
            setBlips(prev => [...prev, { ...latestEvent, blipId }]);
            setTimeout(() => setBlips(prev => prev.filter(b => b.blipId !== blipId)), 2000);
        }
    }, [latestEvent]);

    // ATOMIC INTERACTION HANDLER
    const handleEventClick = (event: any) => {
        const child = children.find(c => c.name === event.name) || {
            ...event,
            id: event.id || 'unknown',
            naughtyScore: event.type === 'Naughty' ? 80 : 20,
            wishlist: 'Analyzing...'
        };
        setSelectedChild(child);
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
            setSelectedChild(prev => prev ? ({ ...prev, status, naughtyScore: status === 'NICE' ? 0 : 100 }) : null);
            refreshChildren(); // Sync with DB
            
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
             <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} className="h-full w-full bg-slate-900">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Controller bound to Selected Child's Location */}
                <MapController location={selectedChild ? { lat: selectedChild.lat, lng: selectedChild.lng } : null} />

                {/* Static Children Markers */}
                {children.map(child => (
                    <Marker 
                        key={child.id} 
                        position={[child.lat, child.lng]}
                        icon={child.status === 'NICE' ? greenIcon : redIcon}
                        eventHandlers={{
                            click: () => setSelectedChild(child) // Marker click also triggers atomic selection
                        }}
                    >
                    </Marker>
                ))}

                {/* Active Event Blips */}
                {blips.map(blip => (
                    <CircleMarker 
                        key={blip.blipId}
                        center={[blip.lat, blip.lng]}
                        pathOptions={{ 
                            color: blip.type === 'NICE' ? '#22c55e' : '#ef4444',
                            fillColor: blip.type === 'NICE' ? '#22c55e' : '#ef4444',
                            fillOpacity: 0.5
                        }}
                        radius={20}
                    />
                ))}
            </MapContainer>
            
            {/* Legend Overlay */}
            <div className="absolute top-4 right-4 bg-black/80 p-4 rounded border border-cyber-blue/30 backdrop-blur text-xs z-[1000] hidden md:block">
                <h3 className="text-cyber-blue mb-2 font-bold">LEGEND</h3>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div> Nice List
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Naughty List
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
                    toast.type === 'success' ? 'bg-green-900/80 border-green-500 text-green-100' : 'bg-red-900/80 border-red-500 text-red-100'
                }`}>
                    {toast.type === 'success' ? <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />}
                    {toast.message}
                </div>
            )}
        </div>
    );
};
