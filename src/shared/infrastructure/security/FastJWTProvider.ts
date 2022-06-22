import {createDecoder, createSigner, createVerifier, SignerSync, VerifierSync} from 'fast-jwt'
import {JWTProvider} from '@/shared/domain/security/JWTProvider'

export class FastJWTProvider implements JWTProvider {
    readonly #signer: typeof SignerSync
    readonly #verifier: typeof VerifierSync
    readonly #decoder: (token: string) => unknown

    constructor(secret: string) {
        this.#signer = createSigner({key: secret})
        this.#verifier = createVerifier({key: secret})
        this.#decoder = createDecoder()
    }

    encode(payload: Record<string, unknown>): string {
        return this.#signer(payload)
    }

    decode(token: string): Record<string, unknown> {
        try {
            this.#verifier(token)
        } catch (e) {
            throw e
        }

        return this.#decoder(token) as Record<string, unknown>
    }
}