import { IncomingMessage, ServerResponse } from 'http'
import { Person } from '../models/Person'
import PersonService from '../services/PersonService'

export default class PersonController {
    private personService: PersonService

    constructor(personService: PersonService) {
        this.personService = personService
    }

    async index(): Promise<Person[]> {
        return await this.personService.findAll()
    }

    async getPerson(urlParams: UrlParams, data: {}): Promise<Person> {
        return await this.personService.findPerson(urlParams.id)
    }

    async createPerson(urlParams: UrlParams, data: PersonRequest): Promise<Person> {
        return await this.personService.createPerson(data)
    }

    async updatePerson(urlParams: UrlParams, data: PersonRequest): Promise<Person> {
        return this.personService.updatePerson(urlParams.id, data)
    }

    async deletePerson(urlParams: UrlParams, data: PersonRequest) {
        await this.personService.deletePerson(urlParams.id)
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
