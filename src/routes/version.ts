import type { AppConfig } from "../config/env";
import type { RequestContext } from "../types";

export function versionRoute(config: AppConfig, context: RequestContext): Response {
	return Response.json({
		gateway_version: config.gatewayVersion,
		api_version: config.apiVersion,
		inference_provider: config.inferenceProvider,
		inference_operation_path: config.inferenceOperationPath,
		inference_version_hint: config.inferenceVersionHint,
		request_id: context.requestId,
	});
}
