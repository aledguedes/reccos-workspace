import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  loading = false;
  submitted = false;
  email: string = '';
  code: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Add these properties to your component class
  passwordHasMinLength = false;
  passwordHasUppercase = false;
  passwordHasLowercase = false;
  passwordHasNumber = false;
  passwordHasSpecialChar = false;
  passwordsMatch = false;
  passwordsDoNotMatch = false;
  
  // Add this method to your component class
  // Add a getter for the confirmPassword control
  get confirmPassword() {
    return this.resetForm.get('confirmPassword')!;
  }
  
  ngOnInit(): void {
    // Get email and code from route params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.code = params['code'] || '';
      
      // Redirect to verification page if no code is provided
      if (!this.code) {
        this.router.navigate(['/auth/verify-code']);
      }
    });

    this.resetForm = this.formBuilder.group({
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  
    // Subscribe to password changes to update strength indicators in real-time
    this.resetForm.get('password')?.valueChanges.subscribe(password => {
      if (password) {
        this.checkPasswordStrength(password);
        this.checkPasswordsMatch();
      } else {
        this.resetPasswordValidators();
      }
    });
  
    // Subscribe to confirmPassword changes to check for match in real-time
    this.resetForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
  }

  // Method to check password strength
  checkPasswordStrength(password: string) {
    this.passwordHasMinLength = password.length >= 8;
    this.passwordHasUppercase = /[A-Z]/.test(password);
    this.passwordHasLowercase = /[a-z]/.test(password);
    this.passwordHasNumber = /\d/.test(password);
    this.passwordHasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  }
  
  // Reset all validators
  resetPasswordValidators() {
    this.passwordHasMinLength = false;
    this.passwordHasUppercase = false;
    this.passwordHasLowercase = false;
    this.passwordHasNumber = false;
    this.passwordHasSpecialChar = false;
  }
  
  // Custom validator to check if passwords match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;

    // Here you would implement the password reset logic
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      this.loading = false;
      alert('Senha alterada com sucesso!');
      this.router.navigate(['/auth/login']);
    }, 1500);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Method to check if passwords match
  checkPasswordsMatch() {
    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    
    if (confirmPassword) {
      this.passwordsMatch = password === confirmPassword;
      this.passwordsDoNotMatch = password !== confirmPassword;
    } else {
      this.passwordsMatch = false;
      this.passwordsDoNotMatch = false;
    }
  }
}
