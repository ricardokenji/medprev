export default class ValidationErrorException extends Error {
    errors: Array<string> 
    constructor(errors: Array<string>) {
        super("ValidationErrorException")
        this.errors = errors
        Error.captureStackTrace(this, ValidationErrorException)
    }
}