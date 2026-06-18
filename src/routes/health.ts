import type { RequestContext } from "../types";

export function healthRoute(context: RequestContext): Response {
	return Response.json({
		status: "ok",
		service: "wakareeru-api-gateway",
		request_id: context.requestId,
		timestamp: new Date().toISOString(),
	});
}
