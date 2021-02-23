import NotFoundException from "../exceptions/NotFoundException"
import InvalidRouteException from "../exceptions/InvalidRouteException"
import { throwExpression } from "../helpers"
import { IncomingMessage, ServerResponse } from 'http'

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

	findMatch(method: Method, request: IncomingMessage, response: ServerResponse): Function {
		return this.routes.find(r => r.getMethod() == method)?.findRoute(request.url!)?.getAction() ?? throwExpression(new NotFoundException("invalid url for " + request.url))
	}
}

export const enum Method {
	GET,
	POST,
	PUT,
	DELETE
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

	constructor(path: string, action : Function) {
		this.path = path
		this.action = action
		this.pattern =  this.getPattern(path)
	}

	match(against: string): boolean {
		return this.pattern.test(against)
	}

	getAction(): Function {
		return this.action
	}

	private getPattern(path: string): RegExp {
		const pattern = path.replace(/{:[a-zA-Z]*}/g, "([^\/])+")
		return new RegExp(pattern, "g")
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
			throwExpression(new InvalidRouteException)
		}
	} 
	return converted
}