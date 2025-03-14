import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter para fácil acesso aos campos do formulário
  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Parar aqui se o formulário for inválido
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    // Aqui você implementaria a lógica para enviar o email de recuperação
    // Por enquanto, vamos apenas simular um atraso e redirecionar
    setTimeout(() => {
      this.loading = false;
      // Redirecionar para a página de verificação de código com o email como parâmetro
      this.router.navigate(['/auth/verify-code'], { 
        queryParams: { email: this.f['email'].value } 
      });
    }, 1500);
  }
}
