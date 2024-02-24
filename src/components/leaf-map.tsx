"use client";

import clsx from "clsx";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type CoordinateType = {
	lat: number;
	lon: number;
	popupMessage: string;
};

export function LeafMap({
	lat,
	lon,
	className,
	popupMessage,
}: CoordinateType & { className?: string }) {
	const icon = L.icon({ iconUrl: "/icon-location.svg", iconSize: [16, 22] });
	return (
		<div className={clsx("w-full h-72 overflow-hidden", className)}>
			<MapContainer className="h-full w-full" center={[lat, lon]} zoom={10}>
				<TileLayer
					attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
				/>
				<Marker position={[lat, lon]} icon={icon}>
					<Popup>{popupMessage}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
