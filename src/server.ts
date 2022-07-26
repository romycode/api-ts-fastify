// fastify
import Fastify, { FastifyError } from 'fastify'

// load env
import { config } from 'dotenv'
import { join } from 'node:path'

// controllers & middlewares
import { GetHealthController } from '@/system/infrastructure/http/controller/GetHealthController'
import { GetWelcomeController } from '@/system/infrastructure/http/controller/GetWelcomeController'
import { JWTAuthenticator } from '@/shared/infrastructure/ui/http/middleware/JWTAuthenticator'
import { FastJWTProvider } from '@/shared/infrastructure/security/FastJWTProvider'

// dotenv load .env files depending on environment
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
const jwtAuthenticator = new JWTAuthenticator(fastJWTProvider)

// v1 routes
server.register(
    (api, _opts, done) => {
        // Public
        api.register(
            (publicApi, _opts, done) => {
                publicApi.get(getWelcomeController.route(), getWelcomeController.handler())
                publicApi.get(getHealthController.route(), getHealthController.handler())

                publicApi.get('/auth', async (_req, rep) => {
                    return rep.status(200).send(fastJWTProvider.encode({ data: 'validate' }))
                })

                done()
            },
        )

        // Private
        api.register(
            (privateApi, _opts, done) => {
                privateApi.addHook('onRequest', jwtAuthenticator.authenticate())

                done()
            },
        )

        done()
    },
    { prefix: 'v1' },
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