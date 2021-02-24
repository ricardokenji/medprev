import { Builder } from "builder-pattern"
import { Person } from "../models/Person"
import PersonRepository from "../repositories/PersonRepository"

export default class PersonService {
    private repository: PersonRepository

    constructor(repository: PersonRepository) {
        this.repository = repository
    }

    createPerson(input: any) {
        let builder = {} as Builder<Person>

        builder.nome(input.nome)
    }

}

type Builder<T> = {
    [k in keyof T]: (arg: T[k]) => Builder<T>
} & { build(): T }
