export interface JWTProvider {
  encode(payload: Record<string, unknown>): string
  decode(token: string): Record<string, unknown>
}
