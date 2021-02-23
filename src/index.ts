import http from 'http'
import routes from './routes'
import NotFoundException from "./exceptions/NotFoundException"
import logger from './lib/logger'
import { stringToMethod } from './lib/SimpleRouter'
import  ResponseHandler  from './lib/ResponseHandler'
import container from './dependencies'

http.createServer(function (request, response) {
	try {
		container
		const method = stringToMethod(request.method!)
		const action = routes.findMatch(method, request, response)
		const body = action(request, response)
		const responseHandler = new ResponseHandler(response, body)
		responseHandler.handle()
	} catch (error) {
		if (error instanceof NotFoundException) {
        	response.writeHead(404, {'Content-type':'text/plain'})
    	} else {
    		response.writeHead(500, {'Content-type':'text/plain'})
    		logger.error(error)
    	}
        response.end()
	}
}).listen(3000)
