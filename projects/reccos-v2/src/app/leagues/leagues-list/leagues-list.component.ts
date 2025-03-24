import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';
import { ILeague, ILeagueCard } from '../../core/models/league.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { GridViewComponent } from '../../shared/components/grid-view/grid-view.component';

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
  imports: [
    CommonModule,
    RouterModule,
    StatCardComponent,
    DataTableComponent,
    GridViewComponent,
  ],
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
    },
    {
      id: 4,
      name: 'Serie A',
      season: '2023/2024',
      startDate: '2023-08-19',
      endDate: '2024-05-26',
      status: 'active',
      teamsCount: 20,
      matchesCount: 380,
    },
    {
      id: 5,
      name: 'Ligue 1',
      season: '2023/2024',
      startDate: '2023-08-13',
      endDate: '2024-05-19',
      status: 'active',
      teamsCount: 18,
      matchesCount: 306,
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

  cards: ILeagueCard[] = [
    {
      title: 'Times Cadastrados',
      value: '24',
      trend: { positive: true, value: 12, lastMonthValue: 10 },
      icon: 'ri-group-line',
    },
    {
      title: 'Jogadores Ativos',
      value: '237',
      trend: { positive: true, value: 5, lastMonthValue: 1 },
      icon: 'ri-line-chart-line',
    },
    {
      title: 'Torneios',
      value: '3',
      trend: { positive: false, value: 0, lastMonthValue: 1 },
      icon: 'ri-trophy-line',
    },
    {
      title: 'Partidas Agendadas',
      value: '16',
      trend: { positive: true, value: 8, lastMonthValue: 4 },
      icon: 'ri-calendar-line',
    },
  ];

  layouts: ILayout[] = [
    { value: 'grid', label: 'Grid View', icon: 'ri-layout-grid-line' },
    { value: 'table', label: 'Table View', icon: 'ri-table-line' },
  ];

  // Stats for cards
  totalLeagues = this.leagues.length;
  activeLeagues = this.leagues.filter(league => league.status === 'active')
    .length;
  totalTeams = this.leagues.reduce((sum, league) => sum + league.teamsCount, 0);
  totalMatches = this.leagues.reduce(
    (sum, league) => sum + league.matchesCount,
    0
  );

  currentLayout = signal<ViewLayout>('table');

  searchQuery = signal<string>('');
  @Output() search = new EventEmitter<string>();

  // Add this property to store filtered leagues
  filteredLeagues: ILeague[] = [];

  constructor() {
    // Initialize filteredLeagues with all leagues
    this.filteredLeagues = [...this.leagues];
  }

  onViewLeague(league: ILeague): void {
    console.log('View league:', league);
    // Implement navigation to league details
  }

  onEditLeague(league: ILeague): void {
    console.log('Edit league:', league);
    // Implement navigation to league edit
  }

  onDeleteLeague(league: ILeague): void {
    console.log('Delete league:', league);
    // Implement league deletion logic
  }

  onSortLeagues(event: { field: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort leagues:', event);
    // Implement sorting logic
  }

  onPageChange(page: number): void {
    console.log('Page changed:', page);
    // Implement pagination logic
  }

  createNewLeague(): void {
    console.log('Create new league');
    // Implement navigation to league creation
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
    this.filteredLeagues = this.leagues.filter(league => 
      !query || 
      league.name.toLowerCase().includes(query) ||
      league.season.toLowerCase().includes(query)
    );
  }
}
