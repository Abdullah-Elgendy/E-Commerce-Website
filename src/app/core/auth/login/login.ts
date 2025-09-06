import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../../service/Auth/SignIn/sign-in-service';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private s_signIn: SignInService) {}

  @ViewChild('showPass') showEye!: ElementRef;
  @ViewChild('hidePass') hideEye!: ElementRef;
  @ViewChild('inputPass') passField!: ElementRef;
  private s_cookie = inject(CookieService);
  private router = inject(Router);
  isLoading: boolean = false;
  errorMsg!: String;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  togglePass() {
    this.showEye.nativeElement.classList.toggle('fa-solid');
    this.hideEye.nativeElement.classList.toggle('fa-solid');
    if (this.passField.nativeElement.getAttribute('type') === 'password') {
      this.passField.nativeElement.setAttribute('type', 'text');
    } else {
      this.passField.nativeElement.setAttribute('type', 'password');
    }
  }

  submitForm() {
    this.isLoading = true;
    if (this.signInForm.valid) {
      this.s_signIn.signInData(this.signInForm.value).subscribe({
        next: (res) => {
          console.log('response', res);
          //save in cookie, can also save in local storage
          // localStorage.setItem('token', res.token);
          this.s_cookie.set('token',res.token)
          //decode token
          this.s_signIn.decodeToken();
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log('error', err.error.message);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}

// message: "success"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjQyZTc0M2M1Y2Q5NDVhZWRjMGQzOCIsIm5hbWUiOiJ0ZXN0QWNjMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU2NjQ2OTcyLCJleHAiOjE3NjQ0MjI5NzJ9.tmaF4BgC8Rv0YWCvXhRVvXSuJYYFaCp0CJbirlsVonA"
// user: {name: 'testAcc2', email: 'testacc234@gmail.com', role: 'user'}
