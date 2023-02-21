import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AuthService } from '../auth.service';
import { PizzaService } from './pizza.service';

@Injectable()
export class PizzaInterceptor implements HttpInterceptor {

  constructor(private pizzaService: PizzaService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    switch(req.method) {
      case 'GET':

        break;
      case 'DELETE':
      case 'POST':

        // Get the auth token from the service.
        
        let headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
        
        
        let headers = new HttpHeaders(headerDict);
        if(req.url.includes('orders')) {
          const authToken = this.pizzaService.getAuthorizationToken();
          if(authToken) {
            headers = headers.append('Authorization', `Bearer ${authToken}`,)
          }


        }

        const authReq = req.clone({headers});
        return next.handle(authReq)
      default:
        break;
    }

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}