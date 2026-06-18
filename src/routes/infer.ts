import type { Principal } from "../auth/principal";
import type { AppConfig } from "../config/env";
import { infer } from "../inference/client";
import { enforceInferenceRateLimit } from "../rate-limit/limiter";
import type { AppEnv, RequestContext } from "../types";
import { parseInferenceMultipart } from "../uploads/multipart";

export async function inferRoute(
	request: Request,
	env: AppEnv,
	config: AppConfig,
	principal: Principal,
	context: RequestContext,
): Promise<Response> {
	await enforceInferenceRateLimit(env, principal);
	const form = await parseInferenceMultipart(request, config);
	const result = await infer(config, form.image, form.topK, principal, context);
	return Response.json(result);
}
