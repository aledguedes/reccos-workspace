import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading = false;
  showPassword = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.initForm();
    // if (typeof window !== 'undefined') {
    //   const token = localStorage.getItem('daily-token') !== null;
    //   if (token) {
    //     console.log(token);
    //     this.router.navigate(['/home']);
    //   }
    // }
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: response => {
          console.log('Login successful', response);
          localStorage.setItem('daily-token', response.token);
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Login failed', error);
        },
      });
    }
  }
}
