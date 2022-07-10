import { JWTProvider } from '@/shared/domain/security/JWTProvider'
import { FastifyRequest } from 'fastify'
import { Unauthorized } from '@/shared/domain/security/Unauthorized'

export class JWTAuthentication {
    constructor(private provider: JWTProvider) {
        this.provider = provider
    }

    authenticate() {
        return async (req: FastifyRequest) => {
            const token = req.headers['authorization']

            if (!token) {
                throw new Unauthorized()
            }

            try {
                this.provider.decode(token.replace('Bearer ', ''))
            } catch (e) {
                throw { code: (e as Error).name, message: (e as Error).message }
            }
        }
    }
}