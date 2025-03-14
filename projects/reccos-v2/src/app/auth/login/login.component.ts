import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  showPassword = false; // Nova propriedade para controlar a visibilidade da senha

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  // Getter para fácil acesso aos campos do formulário
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Parar aqui se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // Aqui você implementaria a lógica de autenticação
    // Por enquanto, vamos apenas simular um delay e verificar o papel do usuário
    setTimeout(() => {
      // Simulando login bem-sucedido
      console.log('Login bem-sucedido', this.loginForm.value);

      // Simulando verificação de papel do usuário
      // Na implementação real, você obteria isso da resposta da API de autenticação
      const userEmail = this.loginForm.value.email.toLowerCase();

      // Verificando o papel do usuário com base no email para fins de demonstração
      // Em um cenário real, isso viria do backend após autenticação
      if (userEmail.includes('admin')) {
        // Redirecionar administradores para a página de ligas
        this.router.navigate(['/leagues']);
      } else {
        // Redirecionar gerentes para a página de federações
        this.router.navigate(['/federations']);
      }

      this.loading = false;
    }, 1500);
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Add these properties to the component class
  accountLocked = false;
  remainingAttempts = 5;
  lockTimeRemaining = 0;
  lockTimeDisplay = '';
  private lockTimeInterval: any;

  // Add these methods to the component
  private startLockCountdown() {
    this.updateLockTimeDisplay();
    this.lockTimeInterval = setInterval(() => {
      this.lockTimeRemaining -= 1000;
      if (this.lockTimeRemaining <= 0) {
        this.accountLocked = false;
        clearInterval(this.lockTimeInterval);
      } else {
        this.updateLockTimeDisplay();
      }
    }, 1000);
  }

  private updateLockTimeDisplay() {
    const minutes = Math.floor(this.lockTimeRemaining / 60000);
    const seconds = Math.floor((this.lockTimeRemaining % 60000) / 1000);
    this.lockTimeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Make sure to add this to ngOnDestroy
  ngOnDestroy() {
    if (this.lockTimeInterval) {
      clearInterval(this.lockTimeInterval);
    }
  }
}
