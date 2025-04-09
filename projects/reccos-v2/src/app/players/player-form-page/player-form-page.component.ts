import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlayerFormComponent],
  providers: [],
  templateUrl: './player-form-page.component.html',
  styleUrl: './player-form-page.component.css',
})
export class PlayerFormPageComponent {
  constructor(private router: Router) {}

  onSave(playerData: any): void {
    // Aqui você implementaria a lógica para salvar os dados do jogador
    // Por exemplo, chamar um serviço que faz uma requisição POST para a API
    console.log('Dados do jogador a serem salvos:', playerData);

    // Simulando um salvamento bem-sucedido
    setTimeout(() => {
      // Redirecionar para a lista de jogadores após salvar
      this.router.navigate(['/players']);
    }, 1000);
  }

  onCancel(): void {
    // Voltar para a lista de jogadores
    this.router.navigate(['/players']);
  }
}
