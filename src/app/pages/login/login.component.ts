import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaService } from 'src/app/core/pizza.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    if(this.authService.IsLoggedIn()) {
      this.router.navigate(['']);
    }
  }
  
  constructor(private router: Router, private pizzaService: PizzaService, private authService: AuthService) {
  }
  submitted = false;
  credentialString = '';
  showError = false;
  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(event: any) {

    if(this.loginForm.valid) {
      this.credentialString = JSON.stringify(this.loginForm.getRawValue())
      this.pizzaService.getPostAuth(this.credentialString).subscribe({
        next: (res) => {
          localStorage.setItem("token", res.access_token)
          this.router.navigate([''])
        },
        error: (error) => {
          this.loginForm.controls['username'].setErrors({'incorrect': true})
          this.loginForm.controls['password'].setErrors({'incorrect': true})
          this.showError = true
          this.errorMessage = error.error.msg
        },
      })
    }
  }
}