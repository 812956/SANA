
import { useEffect, useState } from 'react';
// @ts-ignore
import { Map, Marker } from 'react-map-gl';

// ... (skipping lines)

import 'mapbox-gl/dist/mapbox-gl.css';
import { useSantaSystem } from '../hooks/useSantaSystem';

// Restoring based on "Refine Live Map Visualization" requirements:
// - Santa moves to latest event
// - Green/Red pin icons
// - Blinking ripple effect
// - Live event visualization

const MAPBOX_TOKEN = "pk.eyJ1Ijoic2NhcmxldHR3YXRjaCIsImEiOiJjbTN3dGk2c2wwa2c2MnFzZ2J2dDl6ZzY3In0.Y22r4mJz3BrM4t2pP7_HlQ";

interface Props {
    onChildSelect?: (childId: string) => void;
}

export const InteractiveMap = ({ onChildSelect }: Props) => {
    const { events } = useSantaSystem();
    const [viewState, setViewState] = useState({
        longitude: 0,
        latitude: 90, // North Pole
        zoom: 1.5
    });

    // Auto-pan to latest event
    useEffect(() => {
        if (events && events.length > 0) {
            const latest = events[0];
            setViewState(prev => ({
                ...prev,
                longitude: latest.lng,
                latitude: latest.lat,
                zoom: 3,
                transitionDuration: 2000
            }));
        }
    }, [events]);

    return (
        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-2 border-cyber-blue relative">
            <Map
                {...viewState}
                onMove={(evt: any) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {/* Santa Sleigh Actor */}
                <Marker 
                    longitude={viewState.longitude} 
                    latitude={viewState.latitude} 
                    anchor="center"
                >
                    <div className="relative">
                        <div className="absolute -inset-4 bg-cyber-red/30 rounded-full animate-ping opacity-50"></div>
                        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(255,0,0,0.5)] flex items-center justify-center transform -rotate-12 transition-all duration-1000">
                            <span className="text-2xl">🛷</span>
                        </div>
                        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-red-900/90 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap border border-red-500/50">
                            SANTA 1
                        </div>
                    </div>
                </Marker>

                {/* Render Events */}
                {events.map((evt) => (
                    <Marker 
                        key={evt.id} 
                        longitude={evt.lng} 
                        latitude={evt.lat} 
                        anchor="bottom"
                        onClick={() => onChildSelect && onChildSelect(evt.childId)}
                    >
                        <div className="relative group cursor-pointer">
                            {/* Ripple Effect for Live Events */}
                            <div className="absolute -inset-4 bg-white/30 rounded-full animate-ping opacity-75"></div>
                            
                            {/* Pin Icon */}
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transform hover:scale-110 transition-transform ${
                                evt.type === 'NICE' ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400'
                            }`}>
                                <span className="text-xs font-bold text-white">{evt.type === 'NICE' ? '😇' : '😈'}</span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {evt.name}
                            </div>
                        </div>
                    </Marker>
                ))}
            </Map>
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
};
