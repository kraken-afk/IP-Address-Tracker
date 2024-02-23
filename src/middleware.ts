import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("X-client-ip", request.ip || "127.0.0.1");

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	return response;
}
