import { ServerResponse } from 'http'

export interface ResponseStrategy {
    handle(): void
}

export class JsonResponseStrategy implements ResponseStrategy {
    private body: any
    private response: ServerResponse

    constructor(response: ServerResponse, body: any) {
        this.body = body
        this.response = response
    }

    handle(): void {
        this.response.writeHead(200, {'Content-type':'application/json'})
        this.response.end(JSON.stringify(this.body))
    }
}

export class StringResponseStrategy implements ResponseStrategy {
    private body: any
    private response: ServerResponse
    
    constructor(response: ServerResponse, body: any) {
        this.body = body
        this.response = response
    }

    handle(): void {
        this.response.writeHead(200, {'Content-type':'text/plain'})
        this.response.end(this.body)
    }
}

export default class ResponseHandler {
    private strategy: ResponseStrategy

    constructor(response: ServerResponse, body: any) {
        if (typeof body === 'object' && body !== null) {
            this.strategy = new JsonResponseStrategy(response, body)
        } else {
            this.strategy = new StringResponseStrategy(response, body)
        }
    }

    handle(): void {
        this.strategy.handle()
    }
}