export class ExpiredJWTToken extends Error {
    code = 'JWT-001'
    override message = "Expired JWT token provided"

    constructor() {
        super()
    }
}