// Routing service to interact with the Geoapify API
const API_KEY = '13ed86e985ed4a34908950d326d8b752';

export interface Waypoint {
  lat: number;
  lon: number;
  name?: string;
  address?: string;
}

export interface RouteOptions {
  mode?: 'drive' | 'truck' | 'bicycle' | 'walk'; // Transportation mode
  avoidTolls?: boolean;
  avoidHighways?: boolean;
  departureTime?: string; // ISO string
  trafficModel?: 'best_guess' | 'pessimistic' | 'optimistic';
}

export interface RouteResult {
  type: string;
  features: Array<{
    type: string;
    properties: {
      mode: string;
      waypoints: any[];
      legs: Array<{
        distance: number;
        time: number;
        steps: any[];
      }>;
      distance: number;
      time: number;
    };
    geometry: {
      type: string;
      coordinates: number[][];
    };
  }>;
}

/**
 * Calculate a route between multiple waypoints
 */
export async function calculateRoute(
  waypoints: Waypoint[],
  options: RouteOptions = { mode: 'drive' }
): Promise<RouteResult> {
  if (waypoints.length < 2) {
    throw new Error('At least 2 waypoints are required to calculate a route');
  }

  // Format waypoints for the API
  const waypointsParam = waypoints
    .map(wp => `${wp.lat},${wp.lon}`)
    .join('|');

  // Build query parameters
  const params = new URLSearchParams({
    waypoints: waypointsParam,
    mode: options.mode || 'drive',
    apiKey: API_KEY
  });

  if (options.avoidTolls) params.append('avoid', 'tolls');
  if (options.avoidHighways) params.append('avoid', 'highways');
  if (options.departureTime) params.append('departure_time', options.departureTime);
  if (options.trafficModel) params.append('traffic_model', options.trafficModel);

  try {
    const response = await fetch(`https://api.geoapify.com/v1/routing?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Routing API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to calculate route:', error);
    throw error;
  }
}

/**
 * Generate mock coordinates around a center point
 * Useful for generating test routes
 */
export function generateTestWaypoints(
  centerLat: number, 
  centerLon: number, 
  count: number = 5, 
  radius: number = 0.05
): Waypoint[] {
  const waypoints: Waypoint[] = [];
  
  // Include center point as first waypoint
  waypoints.push({
    lat: centerLat,
    lon: centerLon,
    name: 'Start'
  });
  
  // Generate random waypoints around the center
  for (let i = 1; i < count; i++) {
    // Random offset in the given radius (in degrees)
    const latOffset = (Math.random() * 2 - 1) * radius;
    const lonOffset = (Math.random() * 2 - 1) * radius;
    
    waypoints.push({
      lat: centerLat + latOffset,
      lon: centerLon + lonOffset,
      name: `Stop ${i}`
    });
  }
  
  return waypoints;
}

/**
 * Get predefined start locations for different district zones
 */
export function getZoneStartLocation(zone: string): Waypoint {
  // Default to North District if not specified
  const zoneMap: Record<string, Waypoint> = {
    'North District': { lat: 41.8781, lon: -87.6298 }, // Chicago
    'South District': { lat: 33.7490, lon: -84.3880 }, // Atlanta
    'East District': { lat: 40.7128, lon: -74.0060 },  // NYC
    'West District': { lat: 34.0522, lon: -118.2437 }, // LA
    'Central District': { lat: 39.9526, lon: -75.1652 } // Philadelphia
  };
  
  return zoneMap[zone] || zoneMap['North District'];
}