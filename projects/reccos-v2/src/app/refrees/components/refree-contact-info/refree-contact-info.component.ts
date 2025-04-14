import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CepService, Endereco } from '../../../shared/services/cep.service';

@Component({
  selector: 'app-refree-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './refree-contact-info.component.html',
  styleUrl: './refree-contact-info.component.scss',
})
export class RefreeContactInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  contactForm!: FormGroup;
  cepError = false;
  cepLoading = false;
  addressLoading = false;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.email, Validators.maxLength(100)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', Validators.maxLength(150)],
      number: ['', Validators.maxLength(10)],
      district: ['', Validators.maxLength(50)],
      complement: ['', Validators.maxLength(50)],
      city: ['', Validators.maxLength(50)],
      state: ['', Validators.maxLength(2)],
      phone: [
        this.initialData?.phone || '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/),
        ],
      ],
    });
  }

  onNext(): void {
    if (this.contactForm.valid) {
      this.next.emit(this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Formato de telefone inválido. Use (00) 00000-0000 ou apenas números';
      }
      return 'Formato inválido';
    }
    if (control.hasError('email')) return 'Email inválido';

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

  buscarCEP(): void {
    const cepControl = this.contactForm.get('cep')?.value;
    console.log('buscarCEP', cepControl);
    const cepSanitized = cepControl.replace(/[^\d]/g, '');
    if (cepSanitized.length !== 8) {
      this.contactForm.get('cep')?.setErrors({ pattern: true });
      return;
    }

    this.cepLoading = true;
    this.cepService.buscarCEP(cepControl).subscribe({
      next: (endereco: Endereco) => {
        if (endereco) {
          this.contactForm.patchValue({
            address: endereco.logradouro,
            city: endereco.localidade,
            state: endereco.uf,
            district: endereco.bairro,
            complement: endereco.complemento,
          });
        }
        this.cepLoading = false;
        this.cepError = false;
      },
      error: (error: any) => {
        console.error(error);
        this.cepError = true;
        this.cepLoading = false;
      },
    });
  }
}
