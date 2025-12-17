import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

    const createCustomIcon = (type, status) => {
        const color = status === 'full' ? '#f97316' :
            type === 'food' ? '#3b82f6' : '#22c55e';

        const markerHtml = `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`;

        return L.divIcon({
            className: 'custom-pin',
            html: markerHtml,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
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
                    icon={createCustomIcon(item.type, item.status)}
                >
                    <Popup>
                        <b>{item.name}</b><br />
                        {item.address}<br />
                        {item.status === 'full' ? 'FULL' : 'Available'}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CommunityMap;
