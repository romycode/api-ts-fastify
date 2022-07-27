// bootstrap
import { FastJWTProvider } from '@/shared/infrastructure/security/FastJWTProvider'
import { JWTAuthenticator } from '@/shared/infrastructure/ui/http/middleware/JWTAuthenticator'
import { ErrorHandler } from '@/shared/infrastructure/ui/http/middleware/ErrorHandler'
import { GetWelcomeController } from '@/system/infrastructure/ui/http/GetWelcomeController'
import { GetHealthController } from '@/system/infrastructure/ui/http/GetHealthController'
import { PostAuthController } from '@/auth/infrastructure/ui/http/PostAuthController'

export const boot = () => {
    const fastJWTProvider = new FastJWTProvider(process.env['JWT_SECRET'] as string)
    const jwtAuthenticator = new JWTAuthenticator(fastJWTProvider)

    const errorHandler = new ErrorHandler()

    const getWelcomeController = new GetWelcomeController()
    const getHealthController = new GetHealthController()
    const postAuthController = new PostAuthController(fastJWTProvider)

    return {
        jwtAuthenticator,
        errorHandler,
        getWelcomeController,
        getHealthController,
        postAuthController,
    }
}