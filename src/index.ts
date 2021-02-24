import http, { IncomingMessage } from 'http'
import { Logger, stringToMethod, ResponseHandler } from './lib/framework'
import routes from './routes'


http.createServer(function (request, response) {
	try {
		const method = stringToMethod(request.method!)
		const action = routes.findMatch(method, request, response)
	} catch (error: any) {
		response.writeHead(500, {'Content-type':'text/plain'})
		response.end()
		Logger.error(error)
	}
}).listen(3000)

