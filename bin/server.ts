import { app } from '@/app'

(
  async () => {
    await app
      .listen(
        { host: '0.0.0.0', port: 8080 },
        (err, address) => {
          if (err) app.log.error(err)
          app.log.info(`Server is now listening on ${address}`)
        }
      )
  }
)()
