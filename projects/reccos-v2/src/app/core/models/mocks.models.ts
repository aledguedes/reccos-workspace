export interface ITeamMock {
  id: number;
  name: string;
  avatar: string;
  status: string;
  role: string;
  league: ILeagueMock;
  email: string;
}

export interface ILeagueMock {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  federation: {
    id: number;
    name: string;
  };
}

export interface IPlayerMock {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  team: ITeamMock;
}

export interface IRefereeMock {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  league: ILeagueMock;
}

export interface IUserMock {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  federation: string;
}

export interface IFederationMock {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  federation: null;
}

export const leagues: ILeagueMock[] = [
  {
    id: 1,
    name: 'La Liga Española',
    email: 'contact@laliga.com',
    role: 'national-league',
    avatar: '',
    status: 'active',
    federation: {
      id: 1,
      name: 'Spanish Football Federation',
    },
  },
];

export const teams: ITeamMock[] = [
  {
    id: 1,
    name: 'Real Madrid',
    email: 'contact@realmadrid.com',
    role: 'club',
    avatar: '',
    status: 'active',
    league: leagues[0],
  },
  {
    id: 2,
    name: 'FC Barcelona',
    email: 'contact@fcbarcelona.com',
    role: 'club',
    avatar: '',
    status: 'active',
    league: leagues[0],
  },
];

export const players: IPlayerMock[] = [
  {
    id: 1,
    name: 'Vinícius Júnior',
    email: 'vinicius.jr@realmadrid.com',
    role: 'forward',
    avatar: '',
    status: 'active',
    team: teams[0],
  },
  {
    id: 2,
    name: 'Pedri',
    email: 'pedri@fcbarcelona.com',
    role: 'midfielder',
    avatar: '',
    status: 'active',
    team: teams[1],
  },
];

export const referees: IRefereeMock[] = [
  {
    id: 1,
    name: 'Antonio Mateu Lahoz',
    email: 'lahoz@laliga.com',
    role: 'main',
    avatar: '',
    status: 'active',
    league: leagues[0],
  },
  {
    id: 2,
    name: 'Carlos del Cerro Grande',
    email: 'carlos.grande@laliga.com',
    role: 'assistant',
    avatar: '',
    status: 'retired',
    league: leagues[0],
  },
];

export const usersMock: IUserMock[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'admin',
    avatar: '',
    status: 'active',
    federation: 'Spanish Football Federation',
  },
  {
    id: 2,
    name: 'Maria González',
    email: 'maria.gonzalez@example.com',
    role: 'manager',
    avatar: '',
    status: 'active',
    federation: 'Catalan Football Federation',
  },
  {
    id: 3,
    name: 'Carlos Martínez',
    email: 'carlos.martinez@example.com',
    role: 'editor',
    avatar: '',
    status: 'inactive',
    federation: 'Andalusian Football Federation',
  },
  {
    id: 4,
    name: 'Ana López',
    email: 'ana.lopez@example.com',
    role: 'viewer',
    avatar: '',
    status: 'pending',
    federation: 'Basque Football Federation',
  },
];
