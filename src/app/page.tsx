import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
	const header = headers();
	const ip = header.get("X-client-ip") as string;

	redirect(`/${ip}`);
}
