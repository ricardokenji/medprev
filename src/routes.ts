import PersonController from './controllers/PersonController'
import SimpleRouter from './lib/SimpleRouter'

//Here we add routes for the application
let simpleRouter = new SimpleRouter()

let personController = new PersonController()

simpleRouter.get("person/{:id}", personController.getPerson)
simpleRouter.post("person/", personController.createPerson)
simpleRouter.put("person/{:id}", personController.updatePerson)
simpleRouter.delete("person/{:id}", personController.deletePerson)
simpleRouter.get("person", personController.index)


export default simpleRouter