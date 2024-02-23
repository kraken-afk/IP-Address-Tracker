"use client";

import clsx from "clsx";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type CoordinateType = {
	lat: number;
	lon: number;
};

export function LeafMap({
	lat,
	lon,
	className,
}: CoordinateType & { className?: string }) {
	const icon = L.icon({ iconUrl: "/icon-location.svg" });
	return (
		<div className={clsx("w-full h-72 overflow-hidden", className)}>
			<MapContainer
				className="h-full w-full"
				center={[lat, lon]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[lat, lon]} icon={icon}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}
