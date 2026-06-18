export interface InferenceRequest {
	input: {
		image_base64: string;
		top_k?: number;
	};
	request_context: {
		request_id: string;
		client_tier: string;
		image_content_type: string;
		image_bytes: number;
	};
}

export type InferenceResponse = unknown;
