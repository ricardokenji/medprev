import { Logger } from '../lib/framework';
import { Person } from '../models/Person'
import PersonSchema from '../models/PersonSchema'

export default class PersonRepository {
    async save(person: Person) {
        Logger.info('Saving person')
        const personSchema = new PersonSchema(person)
        await personSchema.save();
    }

    async update(id: string, person: Person) {
        await PersonSchema.updateOne({ 'personId': id }, person)
    }

    async delete(id: string) {
        await PersonSchema.deleteOne({ 'personId': id })
    }
}

