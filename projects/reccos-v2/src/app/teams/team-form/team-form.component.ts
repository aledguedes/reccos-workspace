import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamBasicInfoComponent } from '../components/team-basic-info/team-basic-info.component';
import { TeamCoachInfoComponent } from '../components/team-coach-info/team-coach-info.component';
import { TeamConfirmationComponent } from '../components/team-confirmation/team-confirmation.component';
import { TeamUniformInfoComponent } from '../components/team-uniform-info/team-uniform-info.component';
import { ITeam } from '../../core/models/team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TeamBasicInfoComponent,
    TeamCoachInfoComponent,
    TeamConfirmationComponent,
    TeamUniformInfoComponent,
  ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss',
})
export class TeamFormComponent {
  @Input() team: ITeam | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  // Dados agregados de todas as etapas
  teamData: any = {};
  logoPreview: string | null = null;
  totalSteps = 4;
  currentStep = 1;

  isSubmitting = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.initializeTeamData();
  }

  initializeTeamData(): void {
    // Inicializar dados do time a partir do input, se existir
    if (this.team) {
      this.teamData = { ...this.team };
      this.logoPreview = this.team.logo || null;
    } else {
      // Inicializar com valores padrão para um novo time
      this.teamData = {
        status: 'pendente',
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
  onBasicInfoNext(data: any): void {
    this.teamData = { ...this.teamData, ...data };
    this.logoPreview = data.logo;
    this.nextStep();
  }

  onCoachInfoNext(data: any): void {
    this.teamData = { ...this.teamData, ...data };
    this.nextStep();
  }

  onUniformInfoNext(data: any): void {
    this.teamData = { ...this.teamData, ...data };
    this.nextStep();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    // Adicionar status ao objeto final se não existir
    const finalTeamData = {
      ...this.teamData,
      status: this.team?.status || 'pendente',
    };

    // Emitir evento com os dados do time
    this.save.emit(finalTeamData);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onCancelTeam(): void {
    // Navegar de volta para a lista de times
    this.router.navigate(['/teams']);
  }
}
