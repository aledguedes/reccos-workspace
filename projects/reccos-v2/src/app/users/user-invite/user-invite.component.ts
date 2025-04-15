import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class UserInviteComponent {
  @Output() cancel = new EventEmitter<void>();
  inviteForm: FormGroup;
  roles: string[] = [
    'Super Admin',
    'Admin da Federação',
    'Organizador de Campeonato',
    'Técnico',
    'Jogador',
    'Árbitro',
    'Visualizador',
    'Suporte Técnico',
  ];
  inviteHistory: { email: string; status: string }[] = [
    { email: 'user1@example.com', status: 'Pendente' },
    { email: 'user2@example.com', status: 'Aceito' },
    { email: 'user3@example.com', status: 'Expirado' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const newInvite = {
        email: this.inviteForm.value.email,
        status: 'Pendente',
      };
      this.inviteHistory.push(newInvite);
      // Lógica para enviar o convite
    }
  }

  onCancelTeam() {
    this.router.navigate(['/users']);
  }
}
