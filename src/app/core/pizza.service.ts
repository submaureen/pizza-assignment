import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auth } from '../shared/interfaces/auth';

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
}
