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
  @Input() parentForm!: FormGroup;
  @Output() proceed = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Verificar se o formulário pai foi injetado corretamente
    if (!this.parentForm) {
      console.error('O formulário pai não foi injetado corretamente!');
      return;
    }
  }

  onNext(): void {
    if (this.validateStep()) {
      this.proceed.emit();
    }
  }

  validateStep(): boolean {
    // Marcar todos os campos como touched para mostrar validações
    Object.keys(this.parentForm.controls).forEach(key => {
      const control = this.parentForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    // Verificar se os campos específicos desta etapa são válidos
    const requiredFields = ['name', 'season'];
    let isValid = true;

    requiredFields.forEach(field => {
      const control = this.parentForm.get(field);
      if (control?.invalid) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Método para verificar se o formulário está válido para habilitar o botão de próximo
  isFormValid(): boolean {
    const requiredFields = ['name', 'season'];
    return requiredFields.every(field => {
      const control = this.parentForm.get(field);
      return control && control.valid;
    });
  }
}
