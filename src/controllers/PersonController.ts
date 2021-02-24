import { IncomingMessage, ServerResponse } from 'http'
import PersonService from '../services/PersonService'

export default class PersonController {
    private personService: PersonService

    constructor(personService: PersonService) {
        this.personService = personService
    }

    index(data: {}): any {
        return {
            a: "z"
        }
    }

    getPerson(data: {}): any {
        return {
            a: "x"
        }
    }

    createPerson(data: any) {
        return data
        // this.personService.createPerson(data)
    }

    updatePerson() {

    }

    deletePerson() {

    }

}