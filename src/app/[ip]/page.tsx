import { LeafMap } from "@/components/leaf-map";
import { SearchBar } from "@/components/ui/search-bar";
import { getApiUri } from "@/libs/utils";
import { clsx } from "clsx";

type DataType = Array<{ label: string; data: string }>;

export default async function Page({ params }: { params: { ip: string } }) {
	const ip = params.ip;
	const resposne = await fetch(getApiUri(ip));
	const data: IpApiResponse = await resposne.json();
	const details: DataType = [];

	if (data.status === "success") {
		details.push(
			...([
				{
					label: "IP ADDRESS",
					data: ip,
				},
				{
					label: "LOCATION",
					data: `${data.city}, ${data.country}`,
				},
				{
					label: "TIMEZONE",
					data: data.timezone,
				},
				{
					label: "ISP",
					data: data.isp,
				},
			] as DataType),
		);
	}

	return (
		<>
			<div className="flex items-center justify-center flex-col absolute top-8 left-1/2 translate-x-[-50%] max-w-5xl w-full px-4 z-20">
				<h1 className="text-white text-2xl sm:text-3xl font-bold mb-8">
					IP Address Tracker
				</h1>

				<SearchBar ipTarget={ip} />

				{data.status === "success" && (
					<div className="bg-white w-full rounded-lg translate-y-8 grid sm:grid-cols-2 md:grid-cols-4 p-2 shadow-lg">
						{details.map((e, i) => (
							<div
								className={clsx(
									"flex flex-col items-center p-2 sm:p-4 sm:space-y-2 border-l border-l-transparent w-full",
									i !== 0 && "border-l-zinc-200",
								)}
								key={e.label}
							>
								<span className="text-sm text-zinc-700">{e.label}</span>
								<span className="text-base font-semibold">{e.data}</span>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="h-dvh w-full flex flex-col">
				<div className="shadow-md basis-64 h-3/100 w-full h-64 bg-[url('/pattern-bg-mobile.png')] xsm:bg-[url('/pattern-bg-desktop.png')] bg-center bg-cover bg-no-repeat" />
				{data.status === "success" ? (
					<LeafMap
						className="basis-2/3 z-10"
						lat={data.lat}
						lon={data.lon}
						popupMessage={data.city}
					/>
				) : (
					<div className="basis-2/3 w-full flex items-center justify-center">
						<span className="text-4xl">
							{data.query}: {data.message}
						</span>
					</div>
				)}
			</div>
		</>
	);
}
