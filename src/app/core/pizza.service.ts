import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auth } from '../shared/interfaces/auth';
import { Pizza } from '../shared/interfaces/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) {}

  getPostAuth(data: string){
    return this.http.post<Auth>('https://pizza-api-app.herokuapp.com/api/auth', data).pipe(
      map(response => {
        return response;

    }))
  }

  getAuthorizationToken() {
    return localStorage.getItem('token')
  }

  getPizzas() {
    return this.http.get<Pizza[]>('https://pizza-api-app.herokuapp.com/api/orders').pipe(
      map(response => {
        return response;

    }))
  }

  postPizzaOrder(data: string) {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.getAuthorizationToken()}`,
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Pizza[]>('https://pizza-api-app.herokuapp.com/api/orders', data).pipe(
      map(response => {
        return response;

    }))
  }

  deletePizzaOrder(id: string) {
    return this.http.delete(`https://pizza-api-app.herokuapp.com/api/orders/${id}`)

  }
}
