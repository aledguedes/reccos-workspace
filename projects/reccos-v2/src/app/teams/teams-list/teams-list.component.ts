import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';
import { ITeam } from '../../core/models/team.model';
import { GridViewComponent } from '../../shared/components/grid-view/grid-view.component';
import { ToastService } from '../../shared/services/toast.service';
import { TeamFormComponent } from '../team-form/team-form.component';

// Definindo o tipo para os layouts
type ViewLayout = 'grid' | 'list' | 'table';

export interface ILayout {
  value: ViewLayout;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DataTableComponent,
    GridViewComponent,
    TeamFormComponent,
  ],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.scss',
})
export class TeamsListComponent {
  // Mock data for teams
  teams: ITeam[] = [
    {
      id: 1,
      name: 'Manchester United',
      city: 'Manchester',
      state: 'Inglaterra',
      stadium: 'Old Trafford',
      logo: 'assets/team-logos/manchester-united.png',
      status: 'active',
      description: 'Clube de futebol inglês fundado em 1878.',
      coach: 'Erik ten Hag',
      website: 'https://www.manutd.com',
      foundedYear: 1878,
      playersCount: 25,
      leagueName: 'Premier League',
    },
    {
      id: 2,
      name: 'Barcelona',
      city: 'Barcelona',
      state: 'Espanha',
      stadium: 'Camp Nou',
      logo: 'assets/team-logos/barcelona.png',
      status: 'active',
      description: 'Clube de futebol espanhol fundado em 1899.',
      coach: 'Xavi Hernández',
      website: 'https://www.fcbarcelona.com',
      foundedYear: 1899,
      playersCount: 24,
      leagueName: 'La Liga',
    },
    {
      id: 3,
      name: 'Bayern de Munique',
      city: 'Munique',
      state: 'Alemanha',
      stadium: 'Allianz Arena',
      logo: 'assets/team-logos/bayern.png',
      status: 'active',
      description: 'Clube de futebol alemão fundado em 1900.',
      coach: 'Thomas Tuchel',
      website: 'https://www.fcbayern.com',
      foundedYear: 1900,
      playersCount: 26,
      leagueName: 'Bundesliga',
    },
    {
      id: 4,
      name: 'Juventus',
      city: 'Turim',
      state: 'Itália',
      stadium: 'Allianz Stadium',
      logo: 'assets/team-logos/juventus.png',
      status: 'inactive',
      description: 'Clube de futebol italiano fundado em 1897.',
      coach: 'Massimiliano Allegri',
      website: 'https://www.juventus.com',
      foundedYear: 1897,
      playersCount: 23,
      leagueName: 'Serie A',
    },
    {
      id: 5,
      name: 'Paris Saint-Germain',
      city: 'Paris',
      state: 'França',
      stadium: 'Parc des Princes',
      logo: 'assets/team-logos/psg.png',
      status: 'active',
      description: 'Clube de futebol francês fundado em 1970.',
      coach: 'Luis Enrique',
      website: 'https://www.psg.fr',
      foundedYear: 1970,
      playersCount: 27,
      leagueName: 'Ligue 1',
    },
  ];

  // Table columns configuration
  columns: TableColumn[] = [
    { header: 'Nome', field: 'name', sortable: true },
    { header: 'Cidade', field: 'city', sortable: true },
    { header: 'Estado/País', field: 'state', sortable: true },
    { header: 'Estádio', field: 'stadium', sortable: true },
    { header: 'Status', field: 'status', sortable: true },
    { header: 'Liga', field: 'leagueName', sortable: true },
    { header: 'Jogadores', field: 'playersCount', sortable: true },
  ];

  layouts: ILayout[] = [
    { value: 'grid', label: 'Grid View', icon: 'ri-layout-grid-line' },
    { value: 'table', label: 'Table View', icon: 'ri-table-line' },
  ];

  currentLayout = signal<ViewLayout>('table');
  searchQuery = signal<string>('');
  @Output() search = new EventEmitter<string>();

  // Add this property to store filtered teams
  filteredTeams: ITeam[] = [];

  // Add this with your other signals
  isLoading = signal<boolean>(true);

  // Time selecionado para edição
  selectedTeam: ITeam | null = null;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
    // Initialize filteredTeams with all teams
    this.filteredTeams = [...this.teams];

    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); // 1.5 second fake loading time
  }

  onViewTeam(team: ITeam): void {
    console.log('View team:', team);
    // Implement navigation to team details
  }

  onEditTeam(team: ITeam): void {
    console.log('Edit team:', team);
    this.selectedTeam = team;
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.showModal();
  }

  onDeleteTeam(team: ITeam): void {
    console.log('Delete team:', team);
    // Implement team deletion logic
  }

  onSortTeams(event: { field: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort teams:', event);
    // Implement sorting logic
  }

  onPageChange(page: number): void {
    console.log('Page changed:', page);
    // Implement pagination logic
  }

  navigateToCreateTeam(): void {
    console.log('Create new team');
    // Limpar o time selecionado para criar um novo
    this.selectedTeam = null;

    // Abrir o modal de criação
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.showModal();
  }

  setLayout(layout: ViewLayout): void {
    this.currentLayout.set(layout);
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.search.emit(value);
    this.filterTeams(); // Call filter function when search changes
  }

  filterTeams(): void {
    const query = this.searchQuery().toLowerCase();
    this.filteredTeams = this.teams.filter(
      team =>
        !query ||
        team.name.toLowerCase().includes(query) ||
        (team.leagueName && team.leagueName.toLowerCase().includes(query)) ||
        (team.city && team.city.toLowerCase().includes(query))
    );
  }

  onSaveTeam(teamData: any): void {
    console.log('Team saved:', teamData);
    // Aqui você implementaria a lógica para salvar o time no backend

    try {
      // Mapear o status do formulário para o modelo ITeam
      let teamStatus: 'active' | 'inactive' = 'active';

      if (this.selectedTeam) {
        // Modo de edição - atualizar time existente
        const index = this.teams.findIndex(t => t.id === this.selectedTeam!.id);
        if (index !== -1) {
          // Manter os campos que não estão no formulário
          this.teams[index] = {
            ...this.selectedTeam,
            name: teamData.name,
            description: teamData.description,
            city: teamData.city,
            state: teamData.state,
            stadium: teamData.stadium,
            status: teamStatus,
            coach: teamData.coach || this.selectedTeam.coach,
            website: teamData.website || this.selectedTeam.website,
          };
          console.log('Team updated:', this.teams[index]);

          // Exibir mensagem de sucesso para atualização
          this.toastService.success(
            `Time "${teamData.name}" atualizado com sucesso!`
          );
        }
      } else {
        // Modo de criação - adicionar novo time
        const newTeam: ITeam = {
          id: this.teams.length + 1,
          name: teamData.name,
          city: teamData.city,
          state: teamData.state,
          stadium: teamData.stadium,
          leagueName: teamData.leagueName,
          status: teamStatus,
          description: teamData.description,
          coach: teamData.coach,
          website: teamData.website,
          foundedYear: teamData.foundedYear,
          playersCount: teamData.playersCount || 0,
        };

        this.teams.push(newTeam);
        console.log('New team created:', newTeam);

        // Exibir mensagem de sucesso para criação
        this.toastService.success(
          `Time "${teamData.name}" criado com sucesso!`
        );
      }

      // Limpar o time selecionado
      this.selectedTeam = null;

      // Atualizar a lista filtrada
      this.filterTeams();
    } catch (error) {
      // Exibir mensagem de erro caso ocorra algum problema
      console.error('Erro ao salvar time:', error);
      this.toastService.error(
        `Erro ao salvar time: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  onCancelTeam(): void {
    console.log('Team operation cancelled');
    // Limpar o time selecionado
    this.selectedTeam = null;
    // O modal já será fechado pelo componente do formulário
  }
}
