import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" formControlName="email" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" formControlName="password" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
          </div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  fixedUser = { email: 'admin@example.com', password: 'password123' };

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === this.fixedUser.email && password === this.fixedUser.password) {
        console.log('Login successful!', this.loginForm.value);
      } else {
        console.log('Login failed! Incorrect credentials.');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}