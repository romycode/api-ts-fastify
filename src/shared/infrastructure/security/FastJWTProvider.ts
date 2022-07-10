import { createDecoder, createSigner, createVerifier, SignerSync, VerifierSync, TokenError } from 'fast-jwt'
import { JWTProvider } from '@/shared/domain/security/JWTProvider'
import { ExpiredJWTToken } from '@/shared/domain/security/ExpiredJWTToken'
import { InvalidJWTToken } from '@/shared/domain/security/InvalidJWTToken'

export class FastJWTProvider implements JWTProvider {
    private readonly signer: typeof SignerSync
    private readonly verifier: typeof VerifierSync
    private readonly decoder: (token: string) => unknown

    constructor(secret: string) {
        this.signer = createSigner({ key: secret })
        this.verifier = createVerifier({ key: secret })
        this.decoder = createDecoder()
    }

    encode(payload: Record<string, unknown>): string {
        return this.signer(payload)
    }

    decode(token: string): Record<string, unknown> {
        try {
            this.verifier(token)
        } catch (e) {
            if (e instanceof TokenError) {
                if (e.code === TokenError.codes.expired) {
                    throw new ExpiredJWTToken()
                }

                if (e.code === TokenError.codes.malformed) {
                    throw new InvalidJWTToken()
                }
            }

            throw new Error()
        }

        return this.decoder(token) as Record<string, unknown>
    }
}