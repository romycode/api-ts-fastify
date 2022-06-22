// Controllers
import { GetHealthController } from '@/system/infrastructure/http/controller/GetHealthController'
import { GetWelcomeController } from '@/system/infrastructure/http/controller/GetWelcomeController'

// Fastify
import Fastify from 'fastify'
import compress from '@fastify/compress'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

// Load env
import { config } from 'dotenv'
import { join } from 'path'

config({
    override: true,
    path: join(__dirname, `.env${ process.env['NODE_ENV'] ? '.' + process.env['NODE_ENV'] : '' }`),
})

// Fastify server
const app = Fastify({
    logger: 'test' !== process.env['NODE_ENV'],
  disableRequestLogging: true
})

// Middlewares
app.register(cors)
app.register(helmet, { global: true })
app.register(compress, { global: true })

const getWelcomeController = new GetWelcomeController()
const getHealthController = new GetHealthController()

app.get(getWelcomeController.route(), { preValidation: [] }, getWelcomeController.handler())
app.get(getHealthController.route(), getHealthController.handler())

export { app }