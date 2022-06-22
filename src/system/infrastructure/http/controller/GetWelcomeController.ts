import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import { Controller } from '@/shared/domain/Controller'

export class GetWelcomeController implements Controller {
  public route(): string {
    return '/'
  }

  public handler(): RouteHandlerMethod {
    return async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply
        .header("Content-Type", "application/json")
        .status(200)
        .send({data: "!! _+_ WELCOME ENDPOINT _+_ !!"})
    }
  }
}