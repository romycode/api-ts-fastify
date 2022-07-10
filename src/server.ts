// fastify
import Fastify, { FastifyError } from 'fastify'

// load env
import { config } from 'dotenv'
import { join } from 'path'

// controllers & middlewares
import { GetHealthController } from '@/system/infrastructure/http/controller/GetHealthController'
import { GetWelcomeController } from '@/system/infrastructure/http/controller/GetWelcomeController'
import { JWTAuthentication } from '@/shared/infrastructure/ui/http/middleware/JWTAuthentication'
import { FastJWTProvider } from '@/shared/infrastructure/security/FastJWTProvider'

config({
    override: true,
    path: join(__dirname, '..', `.env${ process.env['NODE_ENV'] ? '.' + process.env['NODE_ENV'] : '' }`),
})

// fastify server
const server = Fastify({
    logger: 'test' !== process.env['NODE_ENV'],
    disableRequestLogging: true,
})

// middlewares
server.register(require('@fastify/cors'))
server.register(require('@fastify/helmet'), { global: true })
server.register(require('@fastify/compress'), { global: true })

// bootstrap
const getWelcomeController = new GetWelcomeController()
const getHealthController = new GetHealthController()

const fastJWTProvider = new FastJWTProvider(process.env['JWT_SECRET'] as string)
const jwtAuthenticator = new JWTAuthentication(fastJWTProvider)

// v1 routes
server.register(
    (api, _opts, done) => {
        // Public
        api.register(
            (instance, _opts, done) => {
                instance.get(getWelcomeController.route(), getWelcomeController.handler())
                instance.get(getHealthController.route(), getHealthController.handler())

                instance.get('/auth', async (_req, rep) => {
                    return rep.status(200).send(fastJWTProvider.encode({ data: 'validate' }))
                })

                done()
            },
        )

        // Private
        api.register(
            (instance, _opts, done) => {
                instance.addHook('onRequest', jwtAuthenticator.authenticate())

                done()
            },
        )

        done()
    },
    {
        prefix: 'v1',
    },
)

server.setErrorHandler(function (err: FastifyError, _req, rep) {
    if (err.message === 'Unauthorized') {
        return rep
            .status(401)
            .send({ error: { code: err.code, title: 'Unauthorized', message: 'No auth token present' } })
    }

    return rep
        .status(500)
        .send({ error: { code: err.code, title: 'Error', message: 'Unexpected' } })
})

export { server }