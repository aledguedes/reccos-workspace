import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-referee-basic-info',
  templateUrl: './referee-basic-info.component.html',
  styleUrl: './referee-basic-info.component.css',
  standalone: true,
  imports: [NgClass, CommonModule, ReactiveFormsModule],
})
export class RefereeBasicInfoComponent {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  basicForm!: FormGroup;
  photoPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      availability: ['', Validators.required],
      status: ['', Validators.required],
      photo: [null],
      email: [''],
      experience: [''],
      specialty: [''],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.basicForm.get(controlName);
    return control
      ? control.hasError(errorName) && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.basicForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('maxlength')) {
      return 'Tamanho máximo excedido';
    }

    if (control?.hasError('pattern')) {
      return 'Formato inválido';
    }

    return '';
  }

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onNext(): void {
    if (this.basicForm.valid) {
      this.next.emit(this.basicForm.value);
    }
  }
}
