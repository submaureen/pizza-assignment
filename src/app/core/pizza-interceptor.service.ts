import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PizzaInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    switch(req.method) {
      case 'GET':

        break;
      case 'DELETE':
      case 'POST':
        let headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
        let headers = new HttpHeaders(headerDict);
        const authReq = req.clone({headers});
        return next.handle(authReq)
      default:
        break;
    }

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}