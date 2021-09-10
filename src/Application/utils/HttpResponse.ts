import {Response} from "express";
import HttpStatusCode from "./HttpStatusCode";

export default class HttpResponse {
    constructor(public statusCode:HttpStatusCode, public data:object | null){}
    static response(response:Response,  requestResult:HttpResponse): Response {
        const {statusCode,data} = requestResult;
        // Expected and Unexpected Errors are to be Hanlded Yet.... !
        return response.status(statusCode).send(data); 
    }
}