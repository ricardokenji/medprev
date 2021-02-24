import NotFoundException from "../exceptions/NotFoundException"
import { IncomingMessage, ServerResponse } from 'http'
import { Logger, ResponseHandler } from './framework'
import ValidationErrorException from "../exceptions/ValidationErrorException"


export default class SimpleRouter {
	private routes: Array<RouteGroup>

	constructor() {
		this.routes = [new RouteGroup(Method.GET), new RouteGroup(Method.POST)]
	}

	get(path: string, action: Function) {
		this.routes.find(r => r.getMethod() == Method.GET)?.addRoute(path, action)
	}

	post(path: string, action: Function) {
		this.routes.find(r => r.getMethod() == Method.POST)?.addRoute(path, action)
	}

	put(path: string, action: Function) {
		this.routes.find(r => r.getMethod() == Method.PUT)?.addRoute(path, action)
	}

	delete(path: string, action: Function) {
		this.routes.find(r => r.getMethod() == Method.DELETE)?.addRoute(path, action)
	}

	findMatch(method: Method, request: IncomingMessage, response: ServerResponse) {
		const route = this.routes.find(r => r.getMethod() == method)?.findRoute(request.url!)
		if (route == undefined) {
			throw new NotFoundException()
		}
		this.executeAction(request, response, route)
	}

	private executeAction(request: IncomingMessage, response: ServerResponse, route: Route) {
		const action = route.getAction()
		let data = ''
		request.on('data', chunk => {
			data += chunk;
		})
		request.on('end', () => {
			try {
				const requestBody = data != '' ? JSON.parse(data) : {}
				const parameters = route.getParameters(request.url!)
				const body = action(parameters, requestBody)

				const responseHandler = new ResponseHandler(response, body)
				responseHandler.handle()
			} catch(error) {
				if (error.message == "NotFoundException") {
					const exception: NotFoundException = error;
					response.writeHead(404, {'Content-type':'text/plain'})
					response.end()
				} else if (error.message == "ValidationErrorException") {
					const exception: ValidationErrorException = error;
					response.writeHead(422, {'Content-type':'text/plain'})
					response.end(JSON.stringify({ errors : exception.errors }))
				} else {
					response.writeHead(500, {'Content-type':'text/plain'})
					response.end()
					Logger.error(error)
				}
			}
		})
	}
}

export const enum Method {
	GET,
	POST,
	PUT,
	DELETE,
	UNDEFINED
}

export class RouteGroup {
	private method: Method
	private routes: Array<Route> = []

	constructor(method: Method) {
		this.method = method
	}

	addRoute(path: string, action: Function) {
		this.routes.push(new Route(path, action))
	}

	getMethod(): Method {
		return this.method
	}

	findRoute(path: string): Route | undefined {
		return this.routes.find(r => r.match(path))
	}
}

export class Route {
	private path: string
	private action: Function
	private pattern: RegExp
	private parameters: Array<string>

	constructor(path: string, action : Function) {
		this.path = path
		this.action = action
		this.pattern = this.getPattern(path)
		this.parameters = this.getParametersList(path)
	}

	match(against: string): boolean {
		return this.pattern.test(against)
	}

	getAction(): Function {
		return this.action
	}

	getParameters(url: string): {} {
		const parameters: {[index: string]:any} = {}
		const matches = this.pattern.exec(url)
		if (matches == null) {
			return parameters
		}
		for (let i = 0; i< matches.length; i++) {
			if (i == 0) continue
			parameters[this.parameters[i-1]] = matches[i]
		}
		return parameters
	}

	private getPattern(path: string): RegExp {
		const pattern = path.replace(/{:[a-zA-Z]*}/g, "([a-z0-9-]+)*")
		return new RegExp(pattern)
	} 

	private getParametersList(path: string): Array<string> {
		const list: Array<string> = []
		const parameters = this.path.match(/{:([a-zA-Z]*)}/g)
		parameters?.forEach(param => list.push(param.replace(/[{}:]/g, "")))
		return list
	} 
}

export function stringToMethod(method: string): Method {
	let converted: Method
	switch(method.toLowerCase() as any) {
		case 'get': {
			converted = Method.GET
			break
		}
		case 'post': {
			converted = Method.POST
			break
		}
		case 'put': {
			converted = Method.PUT
			break
		}
		case 'delete': {
			converted = Method.DELETE
			break
		}
		default: {
			converted = Method.UNDEFINED
		}
	} 
	return converted
}