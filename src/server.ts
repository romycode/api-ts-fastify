import { join } from 'node:path'

// fastify
import Fastify from 'fastify'

// load env
import { config } from 'dotenv'
// controllers & middlewares
import { boot } from '@/bootstrap'

// dotenv load .env files depending on environment
config({
    override: true,
    path: join(__dirname, '..', `.env${ process.env['NODE_ENV'] ? '.' + process.env['NODE_ENV'] : '' }`),
})

const {
    jwtAuthenticator,
    errorHandler,
    getWelcomeController,
    getHealthController,
    postAuthController,
} = boot()

// fastify server
const server = Fastify({
    logger: 'test' !== process.env['NODE_ENV'],
    disableRequestLogging: true,
})

// middlewares
server.register(require('@fastify/cors'))
server.register(require('@fastify/helmet'), { global: true })
server.register(require('@fastify/compress'), { global: true })

// v1 routes
server.register(
    (api, _opts, done) => {
        // Public
        api.register(
            (publicApi, _opts, done) => {
                publicApi.get(getWelcomeController.route(), getWelcomeController.handler())
                publicApi.get(getHealthController.route(), getHealthController.handler())
                publicApi.post(postAuthController.route(), postAuthController.handler())

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

server.setErrorHandler(errorHandler.handle())

export { server }