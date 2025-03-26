import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss'],
})
export class LeagueFormComponent implements OnInit {
  leagueForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required]],
      season: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['upcoming', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.leagueForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.leagueForm.controls).forEach(key => {
        const control = this.leagueForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.leagueForm.value);
      this.isSubmitting = false;
      this.router.navigate(['/leagues']);
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/leagues']);
  }
}
