import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DataTableComponent,
  TableColumn,
} from '../../shared/components/data-table/data-table.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { League } from '../../core/models/league.model';

@Component({
  selector: 'app-leagues-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DataTableComponent, StatCardComponent],
  templateUrl: './leagues-list.component.html',
  styleUrl: './leagues-list.component.scss',
})
export class LeaguesListComponent {
  // Mock data for leagues
  leagues: League[] = [
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

  // Stats for cards
  totalLeagues = this.leagues.length;
  activeLeagues = this.leagues.filter(league => league.status === 'active')
    .length;
  totalTeams = this.leagues.reduce((sum, league) => sum + league.teamsCount, 0);
  totalMatches = this.leagues.reduce(
    (sum, league) => sum + league.matchesCount,
    0
  );

  constructor() {}

  onViewLeague(league: League): void {
    console.log('View league:', league);
    // Implement navigation to league details
  }

  onEditLeague(league: League): void {
    console.log('Edit league:', league);
    // Implement navigation to league edit
  }

  onDeleteLeague(league: League): void {
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
}
