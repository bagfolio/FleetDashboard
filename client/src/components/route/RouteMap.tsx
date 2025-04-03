import { useEffect, useRef, useState } from 'react';
import { calculateRoute, Waypoint, RouteResult, RouteOptions } from '@/lib/routingService';

interface RouteMapProps {
  waypoints: Waypoint[];
  options?: RouteOptions;
  onRouteCalculated?: (result: RouteResult) => void;
  height?: string;
  isLoading?: boolean;
}

const DEFAULT_HEIGHT = '450px';

export function RouteMap({ 
  waypoints, 
  options = { mode: 'drive' }, 
  onRouteCalculated,
  height = DEFAULT_HEIGHT,
  isLoading = false
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [routeData, setRouteData] = useState<RouteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Load Geoapify Map
  useEffect(() => {
    if (!mapRef.current || mapInitialized) return;

    // Add Geoapify Map CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@geoapify/leaflet-address-search-plugin@^1/dist/L.Control.GeoapifyAddressSearch.min.css';
    document.head.appendChild(link);

    // Add Leaflet CSS
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
    leafletCss.integrity = 'sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=';
    leafletCss.crossOrigin = '';
    document.head.appendChild(leafletCss);

    // Load Leaflet JS
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
    leafletScript.integrity = 'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=';
    leafletScript.crossOrigin = '';
    
    leafletScript.onload = () => {
      // Initialize map after Leaflet is loaded
      setMapInitialized(true);
    };
    
    document.body.appendChild(leafletScript);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(leafletCss);
      document.body.removeChild(leafletScript);
    };
  }, [mapInitialized]);

  // Initialize map and fetch route when waypoints change
  useEffect(() => {
    if (!mapInitialized || !mapRef.current || waypoints.length < 2 || isLoading) return;

    // Clear previous map
    mapRef.current.innerHTML = '';
    
    const L = window.L;
    if (!L) {
      console.error('Leaflet not loaded');
      return;
    }

    // Create map centered on first waypoint
    const firstWaypoint = waypoints[0];
    const map = L.map(mapRef.current).setView([firstWaypoint.lat, firstWaypoint.lon], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add waypoint markers
    waypoints.forEach((waypoint, index) => {
      const isFirstOrLast = index === 0 || index === waypoints.length - 1;
      const markerColor = isFirstOrLast ? 'red' : 'blue';
      
      const marker = L.marker([waypoint.lat, waypoint.lon], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }).addTo(map);
      
      if (waypoint.name) {
        marker.bindPopup(waypoint.name);
      }
    });

    // Calculate and display route
    const fetchRoute = async () => {
      try {
        setError(null);
        const result = await calculateRoute(waypoints, options);
        setRouteData(result);
        
        if (onRouteCalculated) {
          onRouteCalculated(result);
        }

        // Draw route on map if we have valid route data
        if (result && result.features && result.features.length > 0) {
          const routeFeature = result.features[0];
          
          // Convert GeoJSON coordinates to Leaflet format (they're in reverse order)
          const coordinates = routeFeature.geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          // Draw path
          const path = L.polyline(coordinates, {
            color: '#4CAF50',
            weight: 5,
            opacity: 0.7
          }).addTo(map);
          
          // Fit map to show the entire route
          map.fitBounds(path.getBounds(), { padding: [30, 30] });
        }
      } catch (err) {
        console.error('Error calculating route:', err);
        setError('Failed to calculate route. Please try different waypoints.');
      }
    };

    fetchRoute();

    // Cleanup function to remove the map instance
    return () => {
      map.remove();
    };
  }, [waypoints, options, mapInitialized, isLoading, onRouteCalculated]);

  return (
    <div className="route-map-container">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="loader"></div>
          <span className="ml-2 font-medium text-gray-600">Calculating optimal route...</span>
        </div>
      )}
      
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-700 p-2 text-sm border border-red-200 rounded m-2">
          {error}
        </div>
      )}
      
      <div 
        ref={mapRef}
        className="bg-gray-100 rounded-md w-full relative"
        style={{ height: height }}
      >
        {!mapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400 mx-auto mb-3"></div>
              <p className="text-gray-600 font-medium">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add typings for Leaflet
declare global {
  interface Window {
    L: any;
  }
}