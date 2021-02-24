import { IncomingMessage, ServerResponse } from 'http'
import { Person } from '../models/Person'
import PersonService from '../services/PersonService'

export default class PersonController {
    private personService: PersonService

    constructor(personService: PersonService) {
        this.personService = personService
    }

    index(urlParams: UrlParams, data: {}): any {
        return {
            a: "z"
        }
    }

    getPerson(urlParams: UrlParams, data: {}): any {
        return {
            a: "x"
        }
    }

    createPerson(urlParams: UrlParams, data: PersonRequest): Person {
        return this.personService.createPerson(data)
    }

    updatePerson(urlParams: UrlParams, data: PersonRequest) {
        return this.personService.updatePerson(urlParams.id, data)
    }

    deletePerson(urlParams: UrlParams, data: PersonRequest) {
        //return this.personService.deletePerson(urlParams.id, data)
    }

}

export interface UrlParams {
    id: string
}

export interface PersonRequest {
    tipo: string
    nome: string
    razaoSocial: string
    cpf: string
    cnpj: string
    sexo: string
    dataNascimento: string
    email: string
    telefone: string
    celular: string
    foto: string
    enderecos: Array<AddressRequest> 
}

export interface AddressRequest {
    rua: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
}
