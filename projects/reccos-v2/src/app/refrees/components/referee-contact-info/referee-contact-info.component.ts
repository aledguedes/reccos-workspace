import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-referee-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referee-contact-info.component.html',
  styleUrl: './referee-contact-info.component.scss',
})
export class RefereeContactInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      email: [this.initialData?.email || '', [Validators.email]],
      phone: [
        this.initialData?.phone || '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/),
        ],
      ],
      address: [this.initialData?.address || '', Validators.required],
    });
  }

  onNext(): void {
    if (this.contactForm.valid) {
      this.next.emit(this.contactForm.value);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return (control?.touched && control?.hasError(errorName)) || false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    } else if (control?.hasError('email')) {
      return 'Email inválido';
    } else if (control?.hasError('pattern')) {
      return 'Formato inválido';
    }

    return '';
  }
}
