export type PrincipalKind = "anonymous" | "developer" | "apple_user";
export type PrincipalTier = "anonymous" | "developer" | "user";

export interface Principal {
	kind: PrincipalKind;
	id: string;
	tier: PrincipalTier;
}
