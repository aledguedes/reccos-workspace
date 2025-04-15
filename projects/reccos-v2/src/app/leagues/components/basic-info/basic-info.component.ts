import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<void>();

  personalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (!this.personalForm) {
      this.personalForm = this.fb.group({
        name: ['', Validators.required],
        season: ['', Validators.required],
        description: [''],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        location: ['', Validators.required],
      });
    }
  }

  onNext(): void {
    if (this.personalForm.valid) {
      const formData = {
        ...this.personalForm.value,
        // photo: this.photoPreview,
      };
      this.next.emit(formData);
    } else {
      this.markFormGroupTouched(this.personalForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  validateStep(): boolean {
    // Marcar todos os campos como touched para mostrar validações
    Object.keys(this.personalForm.controls).forEach(key => {
      const control = this.personalForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    // Verificar se os campos específicos desta etapa são válidos
    const requiredFields = [
      'name',
      'season',
      'startDate',
      'endDate',
      'location',
    ];
    let isValid = true;

    requiredFields.forEach(field => {
      const control = this.personalForm.get(field);
      if (control?.invalid) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Método para verificar se o formulário está válido para habilitar o botão de próximo
  isFormValid(): boolean {
    const requiredFields = [
      'name',
      'season',
      'startDate',
      'endDate',
      'location',
    ];
    return requiredFields.every(field => {
      const control = this.personalForm.get(field);
      return control && control.valid;
    });
  }
}
