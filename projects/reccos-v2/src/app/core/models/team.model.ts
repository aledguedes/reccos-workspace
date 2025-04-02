export interface ITeam {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  city?: string;
  state?: string;
  stadium?: string;
  leagueName?: string;
  status: 'active' | 'inactive';
  coach?: string;
  website?: string;
  foundedYear?: number;
  playersCount?: number;
}
