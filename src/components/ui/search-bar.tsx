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
		router.replace(`/${ip}`),
	);

	return (
		<>
			<form
				onSubmit={submitHandler}
				className={clsx(
					"flex rounded-lg overflow-hidden w-full sm:w-96 border-2 shadow-xl",
					"ip" in errors ? "border-red-700" : "border-transparent",
				)}
			>
				<input
					className="basis-11/12 text-base py-3 px-4 text-zinc-700 focus:outline-none"
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
				<span className="absolute top-1/4 block translate-y-6 sm:translate-y-12 md:translate-y-16 text-red-400">
					{errors.ip?.message}
				</span>
			)}
		</>
	);
}
