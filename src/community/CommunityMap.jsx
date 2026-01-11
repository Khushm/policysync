import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const CommunityMap = ({ resources }) => {
    const center = [39.9612, -82.9988]; // Columbus, OH

    const createCustomIcon = (type, isAtCapacity) => {
        let color = '#BA0C2F'; // Shelter (Scarlet)
        if (type === 'pantry') color = '#1e3a8a'; // Food Pantry (Dark Blue)

        const markerHtml = `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.4);"></div>`;

        return L.divIcon({
            className: 'custom-pin',
            html: markerHtml,
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });
    };

    return (
        <MapContainer center={center} zoom={11} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <RecenterMap center={center} />

            {resources.map((item) => (
                <Marker
                    key={item.id}
                    position={[item.lat, item.lng]}
                    icon={createCustomIcon(item.type, item.isAtCapacity)}
                >
                    <Tooltip sticky>
                        <div style={{ padding: '4px' }}>
                            <b style={{ color: item.type === 'shelter' ? '#BA0C2F' : '#1e3a8a' }}>{item.title}</b><br />
                            <span style={{ fontSize: '0.8rem' }}>{item.address}</span><br />
                            {item.type === 'shelter' && (
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: item.isAtCapacity ? '#f97316' : '#22c55e' }}>
                                    {item.isAtCapacity ? 'FULL' : 'Space Available'}
                                </span>
                            )}
                        </div>
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CommunityMap;
