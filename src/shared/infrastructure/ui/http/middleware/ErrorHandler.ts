import { FastifyRequest, FastifyError, FastifyReply } from 'fastify'

export class ErrorHandler {
    constructor() {
    }

    handle() {
        return async (err: FastifyError, _req: FastifyRequest, rep: FastifyReply) => {
            if (err.message === 'Unauthorized') {
                return rep
                    .status(401)
                    .send({ error: { code: err.code, title: 'Unauthorized', message: 'No auth token present' } })
            }

            return rep
                .status(500)
                .send({ error: { code: err.code, title: 'Error', message: 'Unexpected' } })
        }
    }
}