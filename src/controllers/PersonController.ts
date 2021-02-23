import { IncomingMessage, ServerResponse } from 'http'

export default class PersonController {

    index(request: IncomingMessage, response: ServerResponse): any {
        return {
            a: "z"
        }
    }

    getPerson(request: IncomingMessage, response: ServerResponse): any {
        return {
            a: "x"
        }
    }

    createPerson() {

    }

    updatePerson() {

    }

    deletePerson() {

    }
}