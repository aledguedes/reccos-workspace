import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-health-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.scss',
})
export class HealthInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  healthForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.healthForm = this.fb.group({
      emergencyContact: this.fb.group({
        name: [
          this.initialData?.emergencyContact?.name || '',
          [Validators.required, Validators.maxLength(100)],
        ],
        phone: [
          this.initialData?.emergencyContact?.phone || '',
          [Validators.required, Validators.pattern(/^\d{10,11}$/)],
        ],
        relationship: [
          this.initialData?.emergencyContact?.relationship || '',
          Validators.maxLength(50),
        ],
      }),
      bloodType: [this.initialData?.bloodType || ''],
      allergies: [this.initialData?.allergies || '', Validators.maxLength(200)],
      medicalConditions: [
        this.initialData?.medicalConditions || '',
        Validators.maxLength(200),
      ],
    });
  }

  onNext(): void {
    if (this.healthForm.valid) {
      this.next.emit(this.healthForm.value);
    } else {
      this.markFormGroupTouched(this.healthForm);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    if (controlName.includes('.')) {
      const [group, control] = controlName.split('.');
      const formGroup = this.healthForm.get(group) as FormGroup;
      const formControl = formGroup?.get(control);
      return !!(
        formControl &&
        formControl.touched &&
        formControl.hasError(errorName)
      );
    }
    const control = this.healthForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    let control;

    if (controlName.includes('.')) {
      const [group, field] = controlName.split('.');
      const formGroup = this.healthForm.get(group) as FormGroup;
      control = formGroup?.get(field);
    } else {
      control = this.healthForm.get(controlName);
    }

    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control.hasError('pattern')) return 'Formato inválido';

    return 'Campo inválido';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
