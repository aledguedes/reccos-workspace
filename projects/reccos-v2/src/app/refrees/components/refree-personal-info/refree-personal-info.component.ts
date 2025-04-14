import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-refree-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './refree-personal-info.component.html',
  styleUrl: './refree-personal-info.component.scss',
})
export class RefreePersonalInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();

  personalForm!: FormGroup;
  photoFile: File | null = null;
  photoPreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.personalForm = this.fb.group({
      fullName: [
        this.initialData?.fullName || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      cpf: [
        this.initialData?.cpf || '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/),
        ],
      ],
      birthDate: [this.initialData?.birthDate || '', Validators.required],
      photo: [this.initialData?.photo || ''],
    });

    // Inicializar preview da foto se existir
    if (this.initialData?.photo) {
      this.photoPreview = this.initialData.photo;
    }
  }

  onPhotoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.photoFile = file;

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
        this.personalForm.patchValue({ photo: this.photoPreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onNext(): void {
    if (this.personalForm.valid) {
      // Adicionar data de cadastro automaticamente
      const formData = {
        ...this.personalForm.value,
        registrationDate: new Date().toISOString(),
      };
      this.next.emit(formData);
    } else {
      this.markFormGroupTouched(this.personalForm);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.personalForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.personalForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      if (controlName === 'cpf') {
        return 'CPF inválido. Use o formato 000.000.000-00 ou apenas números';
      }
      return 'Formato inválido';
    }

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
