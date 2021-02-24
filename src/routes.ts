import PersonController from './controllers/PersonController'
import { SimpleRouter } from './lib/framework'
import container from './dependencies'

//Here we add routes for the application
const simpleRouter = new SimpleRouter()

const personController = container.getBind<PersonController>(PersonController.name)

simpleRouter.get("person/{:id}", personController.getPerson.bind(personController))
simpleRouter.post("person", personController.createPerson.bind(personController))
simpleRouter.put("person/{:id}", personController.updatePerson.bind(personController))
simpleRouter.delete("person/{:id}", personController.deletePerson.bind(personController))

export default simpleRouter