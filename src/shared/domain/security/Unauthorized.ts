export class Unauthorized extends Error {
    code = 'UN-001'
    override message = "Unauthorized"

    constructor() {
        super()
    }
}