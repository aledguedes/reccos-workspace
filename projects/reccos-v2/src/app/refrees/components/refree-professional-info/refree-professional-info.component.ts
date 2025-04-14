import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-refree-professional-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './refree-professional-info.component.html',
  styleUrl: './refree-professional-info.component.scss',
})
export class RefreeProfessionalInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  professionalForm!: FormGroup;

  // Opções para os campos de seleção
  availabilityOptions = [
    { value: 'disponível', label: 'Disponível' },
    { value: 'indisponível', label: 'Indisponível' },
  ];

  experienceOptions = [
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediário', label: 'Intermediário' },
    { value: 'experiente', label: 'Experiente' },
  ];

  specialtyOptions = [
    { value: 'principal', label: 'Principal' },
    { value: 'auxiliar', label: 'Auxiliar' },
    { value: 'ambos', label: 'Ambos' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.professionalForm = this.fb.group({
      availability: [
        this.initialData?.availability || 'disponível',
        Validators.required,
      ],
      status: [this.initialData?.status || 'pendente', Validators.required],
      experience: [this.initialData?.experience || 'iniciante'],
      specialty: [this.initialData?.specialty || 'principal'],
    });
  }

  onNext(): void {
    if (this.professionalForm.valid) {
      this.next.emit(this.professionalForm.value);
    } else {
      this.markFormGroupTouched(this.professionalForm);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.professionalForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.professionalForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';

    return 'Campo inválido';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
