import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITeam } from '../../../core/models/team.model';

@Component({
  selector: 'app-teams-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teams-selection.component.html',
  styleUrls: ['./teams-selection.component.scss'],
})
export class TeamsSelectionComponent implements OnInit {
  @Input() initialData: any = {};
  @Input() teams: ITeam[] = [];
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  teamsForm!: FormGroup;
  selectedTeams: number[] = [];
  searchTerm: string = '';
  filteredTeams: ITeam[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTeams();
  }

  initForm() {
    // Inicializar o formulário com os times já selecionados, se houver
    this.teamsForm = this.fb.group({
      selectedTeamIds: [
        this.initialData?.selectedTeamIds || [],
        Validators.required,
      ],
      searchTerm: [''],
    });

    // Se já existirem times selecionados, carregá-los
    if (this.initialData?.selectedTeamIds) {
      this.selectedTeams = this.initialData.selectedTeamIds;
    }

    // Observar mudanças no campo de busca
    this.teamsForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.searchTerm = value;
      this.filterTeams();
    });
  }

  loadTeams(): void {
    // Em um cenário real, estes times viriam de um serviço
    // Por enquanto, usaremos dados fixos para demonstração
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
    this.filteredTeams = [...this.teams];
  }

  filterTeams(): void {
    if (!this.searchTerm) {
      this.filteredTeams = [...this.teams];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredTeams = this.teams.filter(team =>
      team.name.toLowerCase().includes(search)
    );
  }

  toggleTeamSelection(teamId: number): void {
    const index = this.selectedTeams.indexOf(teamId);
    if (index === -1) {
      // Adicionar time
      this.selectedTeams.push(teamId);
    } else {
      // Remover time
      this.selectedTeams.splice(index, 1);
    }

    // Atualizar o valor no formulário
    this.teamsForm.get('selectedTeamIds')?.setValue(this.selectedTeams);
  }

  isTeamSelected(teamId: number): boolean {
    return this.selectedTeams.includes(teamId);
  }

  onNext(): void {
    if (this.teamsForm.valid && this.selectedTeams.length > 0) {
      // Emitir os IDs dos times selecionados
      this.next.emit({
        selectedTeamIds: this.selectedTeams,
        // Incluir também os nomes dos times para facilitar a exibição
        selectedTeams: this.teams.filter(team =>
          this.selectedTeams.includes(team.id)
        ),
      });
    } else {
      // Marcar o formulário como tocado para mostrar erros
      this.teamsForm.markAllAsTouched();
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }
}
