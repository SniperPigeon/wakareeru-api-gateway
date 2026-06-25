import { handleRequest } from "./app";
import { loadRuntimeConfig } from "./config/kv";
import type { AppEnv } from "./types";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const runtimeConfig = await loadRuntimeConfig(env);
		return handleRequest(request, env, ctx, runtimeConfig);
	},
} satisfies ExportedHandler<AppEnv>;
