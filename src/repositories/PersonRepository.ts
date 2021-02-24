import { Person } from '../models/Person'
import PersonSchema from '../models/PersonSchema'

export default class PersonRepository {
    async save(person: Person) {
        const personSchema = new PersonSchema(person)
        await personSchema.save();
    }

    async update(id: string, person: Person) {
        await PersonSchema.findByIdAndUpdate(id, person)
    }

    async delete(id: string) {
        await PersonSchema.findByIdAndDelete(id)
    }
}

