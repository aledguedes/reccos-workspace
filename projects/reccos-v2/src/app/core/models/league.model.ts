export interface ILeague {
  id: number;
  name: string;
  season: string;
  endDate: string;
  startDate: string;
  teamsCount: number;
  matchesCount: number;
  status: 'active' | 'finished' | 'upcoming';
}

export interface ILeagueCard {
  icon: string;
  title: string;
  value: string;
  trend: ILeagueCardTrend;
}

export interface ILeagueCardTrend {
  value: number;
  positive: boolean;
  lastMonthValue: number;
}
