import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';
import { ILeague } from '../../core/models/league.model';
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
  
  constructor() {
    // Initialize filteredLeagues with all leagues
    this.filteredLeagues = [...this.leagues];
    
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); // 1.5 second fake loading time
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
