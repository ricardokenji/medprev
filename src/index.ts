import http, { IncomingMessage } from 'http'
import NotFoundException from "./exceptions/NotFoundException"
import { Logger, stringToMethod, ResponseHandler } from './lib/framework'
import routes from './routes'


http.createServer(function (request, response) {
	try {
		if (request.url == 'favicon.ico') {
			response.end()
		}
		let data = ''
		request.on('data', chunk => {
			data += chunk;
		})
		request.on('end', () => {
			const requestBody = data != '' ? JSON.parse(data) : {}
			const method = stringToMethod(request.method!)
			const action = routes.findMatch(method, request, response)
			const body = action(requestBody)
			const responseHandler = new ResponseHandler(response, body)
			responseHandler.handle()
		})
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

