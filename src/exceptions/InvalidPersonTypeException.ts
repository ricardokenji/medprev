export default class InvalidPersonTypeException extends Error {
    constructor() {
        super("InvalidPersonType")
        Error.captureStackTrace(this, InvalidPersonTypeException)
    }
}