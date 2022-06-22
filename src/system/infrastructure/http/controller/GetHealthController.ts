import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import { Controller } from '@/shared/domain/Controller'

export class GetHealthController implements Controller {
  public route(): string {
    return '/health'
  }

  public handler(): RouteHandlerMethod {
    return async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply
        .header("Content-Type", "application/json")
        .status(200)
        .send({data: "!! _+_ HEALTH ENDPOINT _+_ !!"})
    }
  }
}