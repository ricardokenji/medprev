import Container from './lib/Container'

//Here we set dependencies on depency injection container
const container = new Container()

container.bindFactory<Container>(Container.name, () => new Container())


export default container