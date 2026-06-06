import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../../models/login/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(Auth);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequsetModel: LoginRequestModel = {
        userCode: this.loginForm.getRawValue().userName!,
        password: this.loginForm.getRawValue().password!
      };

      this.authService.login(loginRequsetModel).subscribe({
        next: (response) => {
          this.router.navigate(['/'], { replaceUrl : true });
        },
        error: (error) => {
          console.log(error);
          localStorage.clear();
          alert("Kullanıcı kodu veya şifre hatalı!");
        }
      });
    }
  }
}