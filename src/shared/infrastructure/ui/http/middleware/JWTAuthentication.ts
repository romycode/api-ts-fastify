import { JWTProvider }                                           from "@/shared/domain/security/JWTProvider";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export class JWTAuthentication {
    #provider: JWTProvider

    constructor(provider: JWTProvider) {
        this.#provider = provider
    }

    authenticate(): Function {
        return ( async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
            const token = request.headers['authorization']
            const payload = this.#provider.decode(token)
        } )
    }
}