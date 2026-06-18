import type { AppConfig } from "../config/env";
import { ApiError } from "../http/errors";
import type { Principal } from "./principal";

export async function authenticate(request: Request, config: AppConfig): Promise<Principal> {
	const bearer = bearerToken(request);

	if (config.enableDevTokenAuth && bearer && config.devTokens.has(bearer)) {
		return {
			kind: "developer",
			id: `developer:${await tokenFingerprint(bearer)}`,
			tier: "developer",
		};
	}

	if (config.enableAppleAuth && bearer) {
		throw new ApiError(501, "apple_auth_not_implemented", "Apple token auth is not enabled yet.");
	}

	return {
		kind: "anonymous",
		id: `ip:${clientIp(request)}`,
		tier: "anonymous",
	};
}

export function clientIp(request: Request): string {
	return (
		request.headers.get("cf-connecting-ip") ||
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		"unknown"
	);
}

function bearerToken(request: Request): string | null {
	const authorization = request.headers.get("authorization");
	if (!authorization?.toLowerCase().startsWith("bearer ")) {
		return null;
	}
	const token = authorization.slice("bearer ".length).trim();
	return token || null;
}

async function tokenFingerprint(token: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
	return [...new Uint8Array(digest)]
		.slice(0, 8)
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}
