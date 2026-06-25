import type { AppEnv } from "../types";

export interface RuntimeConfigValues {
	modelVersion?: string;
	inferenceTimeoutMs?: string;
	maxImageBytes?: string;
}

const CONFIG_KEYS = ["MODEL_VERSION", "INFERENCE_TIMEOUT_MS", "MAX_IMAGE_BYTES"] as const;

export async function loadRuntimeConfig(env: AppEnv): Promise<RuntimeConfigValues> {
	if (!env.wakareeru_config) {
		return {};
	}

	const values = await env.wakareeru_config.get([...CONFIG_KEYS]);

	return {
		modelVersion: nonEmpty(values.get("MODEL_VERSION")),
		inferenceTimeoutMs: nonEmpty(values.get("INFERENCE_TIMEOUT_MS")),
		maxImageBytes: nonEmpty(values.get("MAX_IMAGE_BYTES")),
	};
}

function nonEmpty(value: string | null | undefined): string | undefined {
	const trimmed = value?.trim();
	return trimmed ? trimmed : undefined;
}
