import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IPlayer, PLAYER_POSITIONS } from '../../core/models/player.model';
import { ITeam } from '../../core/models/team.model';

// Importando os componentes de cada etapa
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SportInfoComponent } from './components/sport-info/sport-info.component';
import { HealthInfoComponent } from './components/health-info/health-info.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ContactInfoGenericComponent } from '../../shared/components/contact-info-generic/contact-info-generic.component';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SportInfoComponent,
    HealthInfoComponent,
    PersonalInfoComponent,
    ConfirmationComponent,
    ContactInfoGenericComponent,
  ],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
})
export class PlayerFormComponent implements OnInit {
  @Input() player: IPlayer | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  // Dados agregados de todas as etapas
  playerData: any = {};
  photoPreview: string | null = null;
  totalSteps = 5;
  currentStep = 1;

  positions = PLAYER_POSITIONS;
  teams: ITeam[] = [];
  positionLabel = '';
  teamName = '';

  isSubmitting = false;

  constructor() {}

  ngOnInit(): void {
    this.loadTeams();
    this.initializePlayerData();
  }

  loadTeams(): void {
    // Simulação de times - em produção, estes viriam de uma API
    this.teams = [
      { id: 1, name: 'Flamengo', status: 'active' },
      { id: 2, name: 'Vasco', status: 'active' },
      { id: 3, name: 'Fluminense', status: 'active' },
      { id: 4, name: 'Botafogo', status: 'active' },
      { id: 5, name: 'São Paulo', status: 'active' },
      { id: 6, name: 'Palmeiras', status: 'active' },
      { id: 7, name: 'Santos', status: 'active' },
      { id: 8, name: 'Corinthians', status: 'active' },
    ];
  }

  initializePlayerData(): void {
    // Inicializar dados do jogador a partir do input, se existir
    if (this.player) {
      this.playerData = { ...this.player };
      this.photoPreview = this.player.photo || null;
      this.positionLabel =
        this.positions.find(p => p.value === this.player?.position)?.label ||
        '';
      this.teamName = this.player?.teamName || '';
    } else {
      // Inicializar com valores padrão para um novo jogador
      this.playerData = {
        status: 'pending',
      };
    }
  }

  // Métodos para navegação entre etapas
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Métodos para receber dados dos componentes filhos
  onPersonalInfoNext(data: any): void {
    this.playerData = { ...this.playerData, ...data };
    this.photoPreview = data.photo;
    this.nextStep();
  }

  onContactInfoNext(data: any): void {
    this.playerData = { ...this.playerData, ...data };
    this.nextStep();
  }

  onSportInfoNext(data: any): void {
    this.playerData = { ...this.playerData, ...data };
    // Atualizar positionLabel e teamName
    this.positionLabel =
      this.positions.find(p => p.value === data.position)?.label || '';
    this.teamName = this.teams.find(t => t.id === data.teamId)?.name || '';
    this.nextStep();
  }

  onHealthInfoNext(data: any): void {
    this.playerData = {
      ...this.playerData,
      ...data,
      emergencyContact: data.emergencyContact,
    };
    this.nextStep();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    // Adicionar status ao objeto final
    const finalPlayerData = {
      ...this.playerData,
      status: this.player?.status || 'pending',
    };

    // Emitir evento com os dados do jogador
    this.save.emit(finalPlayerData);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
