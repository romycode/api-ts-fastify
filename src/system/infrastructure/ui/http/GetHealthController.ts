import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import { Controller } from '@/shared/domain/Controller'

export class GetHealthController implements Controller {
  public route(): string {
    return '/health'
  }

  public handler(): RouteHandlerMethod {
    return async (_req: FastifyRequest, rep: FastifyReply) => {
      return rep
        .header("Content-Type", "application/json")
        .status(200)
        .send({data: "!! _+_ HEALTH ENDPOINT _+_ !!"})
    }
  }
}