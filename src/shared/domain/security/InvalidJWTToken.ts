export class InvalidJWTToken extends Error {
    code = 'JWT-002'
    override message = "Invalid JWT token provided"

    constructor() {
        super()
    }
}