import http, { IncomingMessage } from 'http'
import NotFoundException from "./exceptions/NotFoundException"
import { Logger, stringToMethod, ResponseHandler } from './lib/framework'
import routes from './routes'


http.createServer(function (request, response) {
	try {
		const method = stringToMethod(request.method!)
		const action = routes.findMatch(method, request, response)
		const body = action(requestHandler(request))
		const responseHandler = new ResponseHandler(response, body)
		responseHandler.handle()
	} catch (error) {
		if (error instanceof NotFoundException) {
        	response.writeHead(404, {'Content-type':'text/plain'})
    	} else {
    		response.writeHead(500, {'Content-type':'text/plain'})
    		Logger.error(error)
    	}
        response.end()
	}
}).listen(3000)

let requestHandler = (request: IncomingMessage): {} => {
	let body = '';
	let data = {};
	request.on('data', chunk => {
		body += chunk;
	})
	request.on('end', () => {
		data = JSON.parse(body)
	})
	return data
}