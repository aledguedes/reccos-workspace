import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class VerifyCodeComponent implements OnInit {
  verifyForm!: FormGroup;
  loading = false;
  submitted = false;
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get email from route params or query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.verifyForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.verifyForm.invalid) {
      return;
    }

    this.loading = true;

    // Here you would implement the verification logic
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      this.loading = false;
      // Pass the email and code to the reset password page
      this.router.navigate(['/auth/reset-password'], { 
        queryParams: { 
          email: this.email,
          code: this.f['code'].value 
        } 
      });
    }, 1500);
  }

  resendCode(): void {
    // Implement logic to resend verification code
    alert('Um novo código foi enviado para ' + this.email);
  }
}
