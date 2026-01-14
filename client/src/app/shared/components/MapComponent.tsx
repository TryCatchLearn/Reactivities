import {Marker, Popup, TileLayer} from "react-leaflet";
import {MapContainer} from "react-leaflet/MapContainer";
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    position: [number, number];
    venue: string
}

export default function MapComponent({position, venue}: Props) {
    console.log(position);
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position}>
                <Popup>
                    {venue}
                </Popup>
            </Marker>
        </MapContainer>
    )
}