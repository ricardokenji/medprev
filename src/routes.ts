import PersonController from './controllers/PersonController'
import { SimpleRouter } from './lib/framework'
import container from './dependencies'

//Here we add routes for the application
const simpleRouter = new SimpleRouter()

const personController = container.getBind<PersonController>(PersonController.name)

simpleRouter.get("person/{:id}", personController.getPerson)
simpleRouter.post("person", personController.createPerson)
simpleRouter.put("person/{:id}", personController.updatePerson)
simpleRouter.delete("person/{:id}", personController.deletePerson)
simpleRouter.get("person", personController.index)

export default simpleRouter