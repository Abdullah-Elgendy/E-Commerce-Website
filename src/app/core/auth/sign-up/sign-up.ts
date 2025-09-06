import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from '../../service/Auth/SignUp/sign-up-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  constructor(private s_signUp: SignUpService) {}

  @ViewChild('showPass') showEye!: ElementRef;
  @ViewChild('hidePass') hideEye!: ElementRef;
  @ViewChild('inputPass') passField!: ElementRef;
  private router = inject(Router);
  isLoading: Boolean = false;
  errorMsg!: String;

  signUpForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // regex to match a password from 8 to 30, must contain at least one digit, lower case , upper case and special character without spaces.
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,30}$/
        ),
      ]),
      rePassword: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+2)?01[0125]\d{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  togglePass() {
    this.showEye.nativeElement.classList.toggle('fa-solid');
    this.hideEye.nativeElement.classList.toggle('fa-solid');
    if (this.passField.nativeElement.getAttribute('type') === 'password') {
      this.passField.nativeElement.setAttribute('type', 'text');
    } else {
      this.passField.nativeElement.setAttribute('type', 'password');
    }
  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  submitForm() {
    this.isLoading = true;
    if (this.signUpForm.valid) {
      this.s_signUp.registerData(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log('response', res);
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log('error', err.error.message);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.signUpForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}

// {message: 'success', user: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y…Q1OH0.gZloppp3LgDdQI_MsroMe3Qb0z2MIj6dsF92Qv10wu8'}
// message:"success"
// token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjM0NjgyNmViNjFmMzc1MzI3NzlhNyIsIm5hbWUiOiJBYmR1bGxhaCBFbGdlbmR5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTY1Nzk0NTgsImV4cCI6MTc2NDM1NTQ1OH0.gZloppp3LgDdQI_MsroMe3Qb0z2MIj6dsF92Qv10wu8"
// user: {name: 'Abdullah Elgendy', email: 'abdullahelgendy@gmail.com', role: 'user'}
// pass: abdullahAhmed@1
