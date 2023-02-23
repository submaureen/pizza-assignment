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

  // if user has tried to submit
  submitted = false;
  // {user: '', pw: ''}
  credentialString = '';
  showError = false;
  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private pizzaService: PizzaService, private authService: AuthService) { }

  // if the token exists move to dashboard
  ngOnInit(): void {
    if (this.authService.IsLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  // if the form is valid, try to post login credential, set the login token, and go to dashboard,
  // otherwise set the form fields to invalid
  onSubmit() {
    if (this.loginForm.valid) {
      this.credentialString = JSON.stringify(this.loginForm.getRawValue())
      this.pizzaService.getPostAuth(this.credentialString).subscribe({
        next: (res) => {
          localStorage.setItem("token", res.access_token)
          this.router.navigate([''])
        },
        error: (error) => {
          this.loginForm.controls['username'].setErrors({ 'incorrect': true })
          this.loginForm.controls['password'].setErrors({ 'incorrect': true })
          this.showError = true
          this.errorMessage = error.error.msg
        },
      })
    }
  }
}