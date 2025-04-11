import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CepService } from '../../../../shared/services/cep.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent implements OnInit {
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
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', Validators.maxLength(150)],
      number: ['', Validators.maxLength(10)],
      district: ['', Validators.maxLength(50)],
      complement: ['', Validators.maxLength(50)],
      city: ['', Validators.maxLength(50)],
      state: ['', Validators.maxLength(2)],
    });
  }

  cepControl = this.contactForm.get('cep') as FormControl;

  checkCepValidity() {
    const cepValue = this.cepControl.value?.replace(/[^\d]/g, '') || '';
    this.cepControl.setValue(cepValue, { emitEvent: false });
  }

  buscarCEP(): void {
    const cepControl = this.contactForm.get('contact.cep')?.value;
    const cepSanitized = cepControl.replace(/[^\d]/g, '');
    if (cepSanitized.length !== 8) {
      this.contactForm.get('contact.cep')?.setErrors({ pattern: true });
      return;
    }

    this.cepLoading = true;
    this.cepService.buscarCEP(cepControl).subscribe({
      next: (endereco: any) => {
        if (endereco) {
          this.contactForm.patchValue({
            contact: {
              address: endereco.logradouro,
              city: endereco.localidade,
              state: endereco.uf,
            },
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

  openCepSearch(): void {
    if (this.contactForm.get('contact.cep')?.valid && !this.cepError) {
      window.open(
        'https://buscacepinter.correios.com.br/app/endereco/index.php',
        '_blank'
      );
    }
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
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control.hasError('email')) return 'Email inválido';
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
