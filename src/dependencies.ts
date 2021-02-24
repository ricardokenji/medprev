import { Container } from './lib/framework'
import mongoose, { Connection } from 'mongoose'
import PersonRepository from './repositories/PersonRepository'
import PersonService from './services/PersonService'
import PersonController from './controllers/PersonController'

//Set mongoose
mongoose.connect('mongodb://root:root@localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })

//Here we set dependencies on depency injection container
const container = new Container()

//Bind person repository 
container.bindSingleton<PersonRepository>(PersonRepository.name, new PersonRepository())

//Bind person service
container.bindSingleton<PersonService>(PersonService.name, new PersonService(container.getBind<PersonRepository>(PersonRepository.name)))

//Bind person controller
container.bindSingleton<PersonController>(PersonController.name, new PersonController(container.getBind<PersonService>(PersonService.name)))

export default container