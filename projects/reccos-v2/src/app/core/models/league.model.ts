export interface League {
  id: number;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'finished' | 'upcoming';
  teamsCount: number;
  matchesCount: number;
}
