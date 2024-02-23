import { z } from "zod";
import { validateIp } from "./utils";

export const IpScheme = z.object({
	ip: z.string().refine((ip) => validateIp(ip), {
		message: "IP address must be a valid IPV4",
	}),
});
