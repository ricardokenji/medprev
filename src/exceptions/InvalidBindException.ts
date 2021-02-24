export default class InvalidBindException extends Error {
    constructor() {
        super("InvalidBindException")
        Error.captureStackTrace(this, InvalidBindException)
    }
}