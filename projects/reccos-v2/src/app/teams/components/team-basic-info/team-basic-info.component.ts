import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-team-basic-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-basic-info.component.html',
  styleUrl: './team-basic-info.component.scss',
})
export class TeamBasicInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();

  basicForm!: FormGroup;
  logoPreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.basicForm = this.fb.group({
      name: [
        this.initialData?.name || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      category: [
        this.initialData?.category || '',
        [Validators.required, Validators.maxLength(50)],
      ],
      status: [this.initialData?.status || '', [Validators.required]],
      logo: [''],
    });

    if (this.initialData?.logo) {
      this.logoPreview = this.initialData.logo;
    }
  }

  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onNext(): void {
    if (this.basicForm.valid) {
      const formData = {
        ...this.basicForm.value,
        logo: this.logoPreview,
      };
      this.next.emit(formData);
    } else {
      this.markFormGroupTouched(this.basicForm);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.basicForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.basicForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
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
