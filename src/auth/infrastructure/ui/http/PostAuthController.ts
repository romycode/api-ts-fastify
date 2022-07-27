import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import { Controller } from '@/shared/domain/Controller'
import { JWTProvider } from '@/shared/domain/security/JWTProvider'

export class PostAuthController implements Controller {
    constructor(private jwtProvider: JWTProvider) {
    }

    public route(): string {
        return '/auth'
    }

    public handler(): RouteHandlerMethod {
        return async (_req: FastifyRequest, rep: FastifyReply) => {
            const exp = ( ( new Date() ).getTime() / 1000 ) + ( 15 * 60 )

            return rep
                .header('Content-Type', 'application/json')
                .status(200)
                .send({ data: { token: this.jwtProvider.encode({ iat: exp }) } })
        }
    }
}