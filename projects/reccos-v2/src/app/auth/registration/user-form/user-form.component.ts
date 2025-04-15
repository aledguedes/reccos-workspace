import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [this.cpfValidator]],
        countryCode: ['+55'],
        phone: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].*$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Getter para facilitar acesso aos campos do formulário
  get f() {
    return this.userForm.controls;
  }

  // Validador personalizado para CPF
  cpfValidator(control: any) {
    if (!control.value) {
      return null; // CPF é opcional
    }

    const cpf = control.value.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
      return { cpfInvalid: true };
    }

    // Verificação de CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { cpfInvalid: true };
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    if (
      parseInt(cpf.charAt(9)) !== digit1 ||
      parseInt(cpf.charAt(10)) !== digit2
    ) {
      return { cpfInvalid: true };
    }

    return null;
  }

  // Validador para verificar se as senhas coincidem
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ matching: true });
      return { matching: true };
    }
    return null;
  }

  // Alternar visibilidade da senha
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Alternar visibilidade da confirmação de senha
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Manipulação de upload de imagem
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Verificar tipo de arquivo
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        alert('Formato de arquivo não suportado. Use JPG ou PNG.');
        return;
      }

      // Verificar tamanho do arquivo (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        alert('O arquivo é muito grande. Tamanho máximo: 2MB.');
        return;
      }

      this.selectedFile = file;

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Remover imagem selecionada
  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  // Calcular força da senha
  getPasswordStrength(): number {
    const password = this.f['password'].value;
    if (!password) return 0;

    let strength = 0;

    // Comprimento mínimo
    if (password.length >= 8) strength += 20;

    // Letras minúsculas
    if (/[a-z]/.test(password)) strength += 20;

    // Letras maiúsculas
    if (/[A-Z]/.test(password)) strength += 20;

    // Números
    if (/[0-9]/.test(password)) strength += 20;

    // Caracteres especiais
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    return strength;
  }

  // Obter texto da força da senha
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return 'Não avaliada';
    if (strength <= 20) return 'Muito fraca';
    if (strength <= 40) return 'Fraca';
    if (strength <= 60) return 'Média';
    if (strength <= 80) return 'Forte';
    return 'Muito forte';
  }

  // Obter classe CSS para o texto da força da senha
  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return 'text-gray-500';
    if (strength <= 20) return 'text-red-500';
    if (strength <= 40) return 'text-orange-500';
    if (strength <= 60) return 'text-yellow-500';
    if (strength <= 80) return 'text-lime-500';
    return 'text-green-500';
  }

  // Obter classe CSS para a barra de força da senha
  getPasswordStrengthBarClass(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return 'bg-gray-500';
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 40) return 'bg-orange-500';
    if (strength <= 60) return 'bg-yellow-500';
    if (strength <= 80) return 'bg-lime-500';
    return 'bg-green-500';
  }

  // Enviar formulário
  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      // Rolar para o primeiro campo com erro
      const firstInvalidElement = document.querySelector('.input-error');
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }

    this.isSubmitting = true;

    // Aqui você implementaria a lógica para enviar os dados para o backend
    // Simulando uma requisição assíncrona
    setTimeout(() => {
      console.log('Dados do formulário:', this.userForm.value);
      console.log('Arquivo de imagem:', this.selectedFile);

      this.isSubmitting = false;
      // Redirecionar após o cadastro bem-sucedido
      // this.router.navigate(['/users']);

      // Por enquanto, apenas resetamos o formulário para demonstração
      this.resetForm();
    }, 1500);
  }

  // Cancelar cadastro
  onCancel(): void {
    if (
      confirm(
        'Tem certeza que deseja cancelar? Todos os dados não salvos serão perdidos.'
      )
    ) {
      this.resetForm();
      // this.router.navigate(['/users']);
    }
  }

  // Resetar formulário
  resetForm(): void {
    this.submitted = false;
    this.imagePreview = null;
    this.selectedFile = null;
    this.userForm.reset({
      countryCode: '+55',
    });
  }
}
