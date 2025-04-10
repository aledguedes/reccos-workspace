import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: [
        this.initialData?.email || '',
        [Validators.email, Validators.maxLength(100)],
      ],
      address: [this.initialData?.address || '', Validators.maxLength(200)],
      city: [this.initialData?.city || '', Validators.maxLength(100)],
      state: [this.initialData?.state || '', Validators.maxLength(50)],
      complement: [''],
      district: [''],
    });

    // Preencher os campos com os dados iniciais, se existirem
    if (this.initialData) {
      this.contactForm.patchValue({
        cep: this.initialData.cep || '',
        phone: this.initialData.phone || '',
        email: this.initialData.email || '',
        address: this.initialData.address || '',
        city: this.initialData.city || '',
        state: this.initialData.state || '',
        complement: this.initialData.complement || '',
        district: this.initialData.district || '',
      });
    }
  }

  buscarCEP(): void {
    this.cepLoading = true;
    const cepControl = this.contactForm.get('cep')?.value;
    this.cepService.buscarCEP(cepControl).subscribe({
      next: (endereco: any) => {
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
      },
      error: (error: any) => {
        console.error(error);
        this.cepError = true;
        this.cepLoading = false;
      },
    });
  }

  openCepSearch(): void {
    window.open(
      'https://buscacepinter.correios.com.br/app/endereco/index.php',
      '_blank'
    );
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
