import { Builder } from "builder-pattern"
import { Logger, sanitizer } from "../lib/framework"
import { PersonRequest } from "../controllers/PersonController"
import { Address, Person, PersonType } from "../models/Person"
import PersonRepository from "../repositories/PersonRepository"
import InvalidPersonTypeException from "../exceptions/InvalidPersonTypeException"
import { v4 as uuid } from 'uuid'
import PersonValidator from "../validators/PersonValidator"
import ValidationErrorException from "../exceptions/ValidationErrorException"
import NotFoundException from "../exceptions/NotFoundException"

export default class PersonService {
    private repository: PersonRepository
    private validator: PersonValidator

    constructor(repository: PersonRepository) {
        this.repository = repository
        this.validator = new PersonValidator()
    }

    async createPerson(input: PersonRequest): Promise<Person> {
        Logger.info('Creating person:' + JSON.stringify(input))

        const errors = this.validator.validateRequest(input)
        if (errors.length > 0) {
            throw new ValidationErrorException(errors)
        }

        const person = Builder<Person>()
                            .personId(uuid())
                            .tipo(this.getPersonTypeFrom(input.tipo))
                            .nome(input.nome)
                            .razaoSocial(input.razaoSocial)
                            .cpf(sanitizer.documentNumber(input.cpf))
                            .cnpj(sanitizer.documentNumber(input.cnpj))
                            .sexo(input.sexo)
                            .dataNascimento(input.dataNascimento)
                            .email(input.email)
                            .telefone(input.telefone)
                            .celular(input.celular)
                            .foto(input.foto)
                            .enderecos(this.buildAddressesFrom(input))
                            .build()

        await this.repository.save(person)
        return person
    }

    async updatePerson(personId: string, input: PersonRequest): Promise<Person> {
        Logger.info('Updating person' + personId)

        const errors = this.validator.validateRequest(input)
        if (errors.length > 0) {
            throw new ValidationErrorException(errors)
        }

        const person = Builder<Person>()
                            .tipo(this.getPersonTypeFrom(input.tipo))
                            .nome(input.nome)
                            .razaoSocial(input.razaoSocial)
                            .cpf(sanitizer.documentNumber(input.cpf))
                            .cnpj(sanitizer.documentNumber(input.cnpj))
                            .sexo(input.sexo)
                            .dataNascimento(input.dataNascimento)
                            .email(input.email)
                            .telefone(input.telefone)
                            .celular(input.celular)
                            .foto(input.foto)
                            .enderecos(this.buildAddressesFrom(input))
                            .build()

        await this.repository.update(personId, person)
        return person
    }

    async deletePerson(personId: string) {
        Logger.info('Deleting person' + personId)

        await this.repository.delete(personId)
    }

    async findPerson(personId: string): Promise<Person> {
        const person = await this.repository.findOne(personId)
        if (person == null) {
            throw new NotFoundException()
        }
        return person
    }

    private buildAddressesFrom(input: PersonRequest): Array<Address> {
        const addresses: Array<Address> = []
        input.enderecos.forEach( address =>
            addresses.push(
                Builder<Address>()
                    .rua(address.rua)
                    .numero(address.numero)
                    .complemento(address.complemento)
                    .bairro(address.bairro)
                    .cidade(address.cidade)
                    .estado(address.estado)
                    .cep(address.cep)
                    .build()
            )
        )
        return addresses
    }

    private getPersonTypeFrom(personType: string): PersonType {
        if (personType == PersonType[PersonType.PF]) {
            return PersonType.PF
        }
        if (personType == PersonType[PersonType.PJ]) {
            return PersonType.PJ
        }
        throw new InvalidPersonTypeException
    }
}
