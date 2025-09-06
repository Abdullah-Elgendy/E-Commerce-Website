import { Component, inject } from '@angular/core';
import { ResetPasswordService } from '../../service/Auth/ResetPassword/reset-password-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-component',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.scss',
})
export class ResetPasswordComponent {
  private readonly s_resetPassword = inject(ResetPasswordService);
  isLoading: boolean = false;
  errorMsg!: string;
  step: number = 1;
  private router = inject(Router);

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\d]{6,}$/),
    ]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // regex to maatch a password from 8 to 30, must contain at least one digit, lower case , upper case and special character without spaces.
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,30}$/
      ),
    ]),
  });

  sendCode() {
    this.isLoading = true;
    this.s_resetPassword
      .sendCodeToEmail(this.forgotPasswordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          if (res.statusMsg == 'success') {
            this.step = 2;
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
  }

  verifyCode() {
    this.isLoading = true;
    this.s_resetPassword.VerifyCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }

  changePass() {
    this.isLoading = true;
    this.s_resetPassword.ResetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        if (res.token) {
          this.router.navigate(['./login']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
