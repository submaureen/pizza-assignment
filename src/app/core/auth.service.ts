import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IsLoggedIn() {
    let token = localStorage.getItem('token');
    return (token !== '' && token !== null)
  }
}
