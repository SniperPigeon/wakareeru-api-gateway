import type { RequestContext } from "../types";

export function createRequestContext(request: Request): RequestContext {
	return {
		requestId: request.headers.get("x-request-id") || crypto.randomUUID(),
		startedAt: Date.now(),
	};
}
