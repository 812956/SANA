
export class LocationService {
    async geocodeLocation(city: string, country: string) {
        // Mock Geocoding to prevent crashes
        // In production this would call Mapbox/Google Maps
        console.log(`[GEO] Mock lookup for ${city}, ${country}`);
        
        // Return mostly random coords near the "centers" of these countries for realism
        if (country.toLowerCase().includes('japan')) return { lat: 35.6 + Math.random(), lng: 139.6 + Math.random() };
        if (country.toLowerCase().includes('usa')) return { lat: 40.7 + Math.random(), lng: -74.0 + Math.random() };
        if (country.toLowerCase().includes('uk')) return { lat: 51.5 + Math.random(), lng: -0.1 + Math.random() };
        
        return { lat: 0, lng: 0 };
    }
}

export const locationService = new LocationService();
