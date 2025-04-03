import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';
import { ILeague } from '../../core/models/league.model';
import { GridViewComponent } from '../../shared/components/grid-view/grid-view.component';
import { ToastService } from '../../shared/services/toast.service';

// Definindo o tipo para os layouts
type ViewLayout = 'grid' | 'list' | 'table';

export interface ILayout {
  value: ViewLayout;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-leagues-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DataTableComponent, GridViewComponent],
  templateUrl: './leagues-list.component.html',
  styleUrl: './leagues-list.component.scss',
})
export class LeaguesListComponent {
  // Mock data for leagues
  leagues: ILeague[] = [
    {
      id: 1,
      name: 'Premier League',
      season: '2023/2024',
      startDate: '2023-08-11',
      endDate: '2024-05-19',
      status: 'active',
      teamsCount: 20,
      matchesCount: 380,
      description:
        'Principal campeonato de futebol da Inglaterra, disputado por 20 clubes.',
      location: 'Inglaterra',
    },
    {
      id: 2,
      name: 'La Liga',
      season: '2023/2024',
      startDate: '2023-08-13',
      endDate: '2024-05-26',
      status: 'active',
      teamsCount: 20,
      matchesCount: 380,
      description:
        'Campeonato Espanhol de Futebol, organizado pela Liga Nacional de Fútbol Profesional.',
      location: 'Espanha',
    },
    {
      id: 3,
      name: 'Bundesliga',
      season: '2023/2024',
      startDate: '2023-08-18',
      endDate: '2024-05-18',
      status: 'active',
      teamsCount: 18,
      matchesCount: 306,
      description:
        'Principal campeonato de futebol da Alemanha, disputado por 18 clubes.',
      location: 'Alemanha',
    },
    {
      id: 4,
      name: 'Serie A',
      season: '2023/2024',
      startDate: '2023-08-19',
      endDate: '2024-05-26',
      status: 'archived',
      teamsCount: 20,
      matchesCount: 380,
      description:
        'Campeonato Italiano de Futebol, organizado pela Lega Serie A.',
      location: 'Itália',
    },
    {
      id: 5,
      name: 'Ligue 1',
      season: '2023/2024',
      startDate: '2023-08-13',
      endDate: '2024-05-19',
      status: 'canceled',
      teamsCount: 18,
      matchesCount: 306,
      description:
        'Principal campeonato de futebol da França, disputado por 18 clubes.',
      location: 'França',
    },
  ];

  // Table columns configuration
  columns: TableColumn[] = [
    { header: 'Nome', field: 'name', sortable: true },
    { header: 'Temporada', field: 'season', sortable: true },
    { header: 'Início', field: 'startDate', sortable: true },
    { header: 'Término', field: 'endDate', sortable: true },
    { header: 'Status', field: 'status', sortable: true },
    { header: 'Times', field: 'teamsCount', sortable: true },
    { header: 'Partidas', field: 'matchesCount', sortable: true },
  ];

  layouts: ILayout[] = [
    { value: 'grid', label: 'Grid View', icon: 'ri-layout-grid-line' },
    { value: 'table', label: 'Table View', icon: 'ri-table-line' },
  ];

  currentLayout = signal<ViewLayout>('table');
  searchQuery = signal<string>('');
  @Output() search = new EventEmitter<string>();

  // Add this property to store filtered leagues
  filteredLeagues: ILeague[] = [];

  // Add this with your other signals
  isLoading = signal<boolean>(true);

  // Liga selecionada para edição
  selectedLeague: ILeague | null = null;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
    // Initialize filteredLeagues with all leagues
    this.filteredLeagues = [...this.leagues];

    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); // 1.5 second fake loading time
  }

  onViewLeague(league: ILeague): void {
    this.router.navigate(['/leagues', league.id]);
  }

  onEditLeague(league: ILeague): void {
    this.router.navigate(['/leagues', league.id, 'edit']);
  }

  onDeleteLeague(league: ILeague): void {
    const index = this.leagues.findIndex(l => l.id === league.id);
    if (index !== -1) {
      this.leagues.splice(index, 1);
      this.filteredLeagues = [...this.leagues];
      this.toastService.show('Liga removida com sucesso!');
    }
  }

  onSortLeagues(event: { field: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort leagues:', event);
    // Implement sorting logic
  }

  onPageChange(page: number): void {
    console.log('Page changed:', page);
    // Implement pagination logic
  }

  navigateToNewLeague(): void {
    this.router.navigate(['/leagues/new']);
  }

  setLayout(layout: ViewLayout): void {
    this.currentLayout.set(layout);
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.search.emit(value);
    this.filterLeagues(); // Call filter function when search changes
  }

  filterLeagues(): void {
    const query = this.searchQuery().toLowerCase();
    this.filteredLeagues = this.leagues.filter(
      league =>
        !query ||
        league.name.toLowerCase().includes(query) ||
        league.season.toLowerCase().includes(query)
    );
  }

  onSaveLeague(leagueData: any): void {
    console.log('League saved:', leagueData);
    // Aqui você implementaria a lógica para salvar a liga no backend

    try {
      // Mapear o status do formulário para o modelo ILeague
      let leagueStatus: 'active' | 'archived' | 'canceled' = 'active';

      if (this.selectedLeague) {
        // Modo de edição - atualizar liga existente
        const index = this.leagues.findIndex(
          l => l.id === this.selectedLeague!.id
        );
        if (index !== -1) {
          // Manter os campos que não estão no formulário
          this.leagues[index] = {
            ...this.selectedLeague,
            name: leagueData.name,
            description: leagueData.description,
            location: leagueData.location,
            status: leagueStatus,
            season: leagueData.season || this.selectedLeague.season,
            startDate: leagueData.startDate || this.selectedLeague.startDate,
            endDate: leagueData.endDate || this.selectedLeague.endDate,
          };
          console.log('League updated:', this.leagues[index]);

          // Exibir mensagem de sucesso para atualização
          this.toastService.success(
            `Liga "${leagueData.name}" atualizada com sucesso!`
          );
        }
      } else {
        // Modo de criação - adicionar nova liga
        const newLeague: ILeague = {
          id: this.leagues.length + 1,
          name: leagueData.name,
          season: leagueData.season || '2023/2024',
          startDate:
            leagueData.startDate || new Date().toISOString().split('T')[0],
          endDate: leagueData.endDate || new Date().toISOString().split('T')[0],
          status: leagueStatus,
          teamsCount: 0,
          matchesCount: 0,
          description: leagueData.description,
          location: leagueData.location,
        };

        this.leagues.push(newLeague);
        console.log('New league created:', newLeague);

        // Exibir mensagem de sucesso para criação
        this.toastService.success(
          `Liga "${leagueData.name}" criada com sucesso!`
        );
      }

      // Limpar a liga selecionada
      this.selectedLeague = null;

      // Atualizar a lista filtrada
      this.filterLeagues();
    } catch (error) {
      // Exibir mensagem de erro caso ocorra algum problema
      console.error('Erro ao salvar liga:', error);
      this.toastService.error(
        `Erro ao salvar liga: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  onCancelLeague(): void {
    console.log('League operation cancelled');
    // Limpar a liga selecionada
    this.selectedLeague = null;
    // O modal já será fechado pelo componente do formulário
  }
}
