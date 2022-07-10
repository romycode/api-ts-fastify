import { server } from '@/server'

(
  async () => {
    await server
      .listen(
        { host: '0.0.0.0', port: 8080 },
        (err, address) => {
          if (err) server.log.error(err)
          server.log.info(`Server is now listening on ${address}`)
        }
      )
  }
)()
