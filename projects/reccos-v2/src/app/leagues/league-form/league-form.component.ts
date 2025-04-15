import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ITeam } from '../../core/models/team.model';
import { PLAYER_POSITIONS } from '../../core/models/player.model';
import { BasicInfoComponent } from '../components/basic-info/basic-info.component';
import { TournamentFormatComponent } from '../components/tournament-format/tournament-format.component';
import { TeamsSelectionComponent } from '../components/teams-selection/teams-selection.component';
import { TournamentScheduleComponent } from '../components/tournament-schedule/tournament-schedule.component';

const components = [
  BasicInfoComponent,
  TournamentFormatComponent,
  TeamsSelectionComponent,
  TournamentScheduleComponent,
];

@Component({
  selector: 'app-league-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...components],
  templateUrl: './league-form.component.html',
  styleUrl: './league-form.component.scss',
})
export class LeagueFormComponent implements OnInit {
  @Input() league: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  leagueForm!: FormGroup;
  submitted = false;

  // Dados agregados de todas as etapas
  leagueData: any = {};
  photoPreview: string | null = null;
  totalSteps = 5;
  currentStep = 1;

  positions = PLAYER_POSITIONS;
  teams: ITeam[] = [];
  positionLabel = '';
  teamName = '';

  isSubmitting = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.loadTeams();
    this.initializeRefreeData();
  }

  loadTeams(): void {
    // Simulação de times - em produção, estes viriam de uma API
    this.teams = [
      {
        id: 1,
        name: 'Flamengo',
        logo: 'assets/teams/flamengo.png',
        status: 'active',
      },
      {
        id: 2,
        name: 'Vasco',
        logo: 'assets/teams/vasco.png',
        status: 'active',
      },
      {
        id: 3,
        name: 'Fluminense',
        logo: 'assets/teams/fluminense.png',
        status: 'active',
      },
      {
        id: 4,
        name: 'Botafogo',
        logo: 'assets/teams/botafogo.png',
        status: 'active',
      },
      {
        id: 5,
        name: 'São Paulo',
        logo: 'assets/teams/saopaulo.png',
        status: 'active',
      },
      {
        id: 6,
        name: 'Palmeiras',
        logo: 'assets/teams/palmeiras.png',
        status: 'active',
      },
      {
        id: 7,
        name: 'Santos',
        logo: 'assets/teams/santos.png',
        status: 'active',
      },
      {
        id: 8,
        name: 'Corinthians',
        logo: 'assets/teams/corinthians.png',
        status: 'active',
      },
    ];
  }

  initializeRefreeData(): void {
    // Inicializar dados da liga a partir do input, se existir
    if (this.league) {
      this.leagueData = { ...this.league };
      this.photoPreview = this.league.photo || null;
    } else {
      // Inicializar com valores padrão para uma nova liga
      this.leagueData = {
        status: 'pendente',
        registrationDate: new Date().toISOString(),
        selectedTeamIds: [],
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

  onBasicInfoNext(data: any): void {
    console.log('Form Data:', data);
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  onTournamentFormatNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  onTeamsSelectionNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  onTournamentScheduleNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  // Métodos para receber dados dos componentes filhos
  onPersonalInfoNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.photoPreview = data.photo;
    this.nextStep();
  }

  onContactInfoNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  onProfessionalInfoNext(data: any): void {
    this.leagueData = { ...this.leagueData, ...data };
    this.nextStep();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const finalLeagueData = {
      ...this.leagueData,
      status: this.league?.status || 'pendente',
    };

    // Emitir evento com os dados do árbitro
    this.save.emit(finalLeagueData);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onCancelLeague() {
    this.router.navigate(['/leagues']);
  }
}
