import { LeafMap } from "@/components/leaf-map";
import { SearchBar } from "@/components/ui/search-bar";
import { getApiUri } from "@/libs/utils";

export default async function Page({ params }: { params: { ip: string } }) {
	const ip = params.ip;
	const resposne = await fetch(getApiUri(ip));
	const data: IpApiResponse = await resposne.json();

	return (
		<>
			<div className="flex items-center justify-center flex-col absolute top-8 left-1/2 translate-x-[-50%] max-w-4xl w-full">
				<h1 className="text-white text-xl sm:text-2xl font-bold mb-6">
					IP Address Tracker {ip}
				</h1>
				<SearchBar ipTarget={ip} />
			</div>
			<div className="h-dvh w-full flex flex-col">
				<div className="basis-64 h-3/100 w-full h-64 bg-[url('/pattern-bg-mobile.png')] xsm:bg-[url('/pattern-bg-desktop.png')] bg-center bg-no-repeat" />
				{data.status === "success" ? (
					<LeafMap className="basis-2/3" lat={data.lat} lon={data.lon} />
				) : (
					<div className="basis-2/3" />
				)}
			</div>
		</>
	);
}
