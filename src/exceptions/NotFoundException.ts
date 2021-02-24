export default class NotFoundException extends Error {
    constructor() {
        super("NotFoundException")
        Error.captureStackTrace(this, NotFoundException)
    }
}