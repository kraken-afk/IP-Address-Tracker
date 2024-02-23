"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { IpScheme } from "@/libs/zod-schema";
import { ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import clsx from "clsx/lite";
import { useRouter } from "next/navigation";

type SearchBarProps = {
	ipTarget: string;
};

export function SearchBar({ ipTarget }: SearchBarProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof IpScheme>>({
		resolver: zodResolver(IpScheme),
		defaultValues: {
			ip: ipTarget,
		},
	});
	const router = useRouter();
	const submitHandler: () => void = handleSubmit(({ ip }) =>
		router.push(`/${ip}`),
	);

	return (
		<>
			<form
				onSubmit={submitHandler}
				className={clsx(
					"flex rounded-md overflow-hidden w-64 sm:w-96 border-2",
					"ip" in errors ? "border-red-700" : "border-transparent",
				)}
			>
				<input
					className="basis-11/12 text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-3 text-zinc-700 focus:outline-none"
					type="text"
					placeholder="Your Ip"
					{...register("ip")}
				/>
				<button
					type="submit"
					className="basis-12 px-1 py-2 bg-black flex items-center justify-center hover:bg-zinc-900 transition-colors"
				>
					<ChevronRight color="white" />
				</button>
			</form>
			{"ip" in errors && (
				<span className="absolute top-full block translate-y-2 text-red-400">
					{errors.ip?.message}
				</span>
			)}
		</>
	);
}
