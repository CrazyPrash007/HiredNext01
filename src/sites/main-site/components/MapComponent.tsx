// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in leaflet
// @ts-ignore - Ignore TS errors for Icon.Default prototype modification
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Add custom CSS for tooltips
const tooltipStyle = `
  .leaflet-tooltip {
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .leaflet-tooltip-top:before {
    border-top-color: rgba(0, 0, 0, 0.8);
  }
`;

interface Location {
  name: string;
  coordinates: [number, number];
}

const locations: Location[] = [
  { name: "India", coordinates: [20.5937, 78.9629] },
  { name: "Indonesia", coordinates: [-0.7893, 113.9213] },
  { name: "Dubai", coordinates: [25.2048, 55.2708] },
  { name: "Shanghai", coordinates: [31.2304, 121.4737] },
  { name: "Ethiopia", coordinates: [9.1450, 40.4897] },
  { name: "Jordan", coordinates: [30.5852, 36.2384] }
];

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Add custom CSS for tooltips
    const style = document.createElement('style');
    style.innerHTML = tooltipStyle;
    document.head.appendChild(style);

    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize the map
      const map = L.map(mapRef.current).setView([20, 20], 2);
      
      // Add the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add markers and permanent labels for each location
      locations.forEach(loc => {
        L.marker(loc.coordinates)
          .addTo(map)
          .bindTooltip(loc.name, {
            permanent: true,
            direction: 'top',
            offset: [-3, -8],
            className: 'location-tooltip'
          });
      });
      
      mapInstanceRef.current = map;
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Clean up custom styles
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="map-container" 
      style={{ 
        height: '400px', 
        width: '100%', 
        borderRadius: '10px',
        zIndex: 0
      }}
    ></div>
  );
};

export default MapComponent; 