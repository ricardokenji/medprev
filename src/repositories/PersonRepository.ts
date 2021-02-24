import { Logger } from '../lib/framework';
import { Person } from '../models/Person'
import PersonSchema from '../models/PersonSchema'

export default class PersonRepository {
    async save(person: Person): Promise<Person | null> {
        Logger.info('Saving person')
        const personSchema = new PersonSchema(person)
        return await personSchema.save();
    }

    async update(id: string, person: Person): Promise<Person | null> {
        return await PersonSchema.updateOne({ 'personId': id }, person)
    }

    async delete(id: string) {
        await PersonSchema.deleteOne({ 'personId': id })
    }

    async findOne(id: string): Promise<Person | null> {
        return await PersonSchema.findOne({ 'personId': id })
    }

    async findAll(): Promise<Person[]> {
        return await PersonSchema.find({})
    }
}

