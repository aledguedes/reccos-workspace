export interface LayoutOption {
  value: 'grid' | 'simple' | 'table'; // Restringe value à union desejada
  label: string;
  icon: string;
}

// Interface base para todas as entidades
export interface IEntity {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  relatedEntity?: {
    // Propriedade que varia por entidade
    type: 'federation' | 'league' | 'team' | null; // Tipo da entidade relacionada
    id: number;
    name: string;
    label: string;
  } | null;
}

// Mapeamento de tipos (todos usam IEntity)
export interface EntityTypeMap {
  users: IEntity;
  teams: IEntity;
  leagues: IEntity;
  players: IEntity;
  refrees: IEntity;
  federations: IEntity;
}

export const federations: IEntity[] = [
  {
    id: 1,
    name: 'Spanish Football Federation',
    email: 'contact@spanishfederation.com',
    role: 'federation',
    avatar: '',
    status: 'active',
    relatedEntity: null, // Federações não têm entidade relacionada
  },
];

// Dados mock ajustados
export const leagues: IEntity[] = [
  {
    id: 1,
    name: 'La Liga Española',
    email: 'contact@laliga.com',
    role: 'national-league',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'federation',
      id: 1,
      name: 'Spanish Football Federation',
      label: 'Federação',
    },
  },
];

export const teams: IEntity[] = [
  {
    id: 1,
    name: 'Real Madrid',
    email: 'contact@realmadrid.com',
    role: 'club',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'league',
      id: 1,
      name: 'La Liga Española',
      label: 'Liga',
    },
  },
  {
    id: 2,
    name: 'FC Barcelona',
    email: 'contact@fcbarcelona.com',
    role: 'club',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'league',
      id: 1,
      name: 'La Liga Española',
      label: 'Liga',
    },
  },
];

export const players: IEntity[] = [
  {
    id: 1,
    name: 'Vinícius Júnior',
    email: 'vinicius.jr@realmadrid.com',
    role: 'forward',
    avatar: '',
    status: 'active',
    relatedEntity: { type: 'team', id: 1, name: 'Real Madrid', label: 'Time' },
  },
  {
    id: 2,
    name: 'Pedri',
    email: 'pedri@fcbarcelona.com',
    role: 'midfielder',
    avatar: '',
    status: 'active',
    relatedEntity: { type: 'team', id: 2, name: 'FC Barcelona', label: 'Time' },
  },
];

export const refrees: IEntity[] = [
  {
    id: 1,
    name: 'Antonio Mateu Lahoz',
    email: 'lahoz@laliga.com',
    role: 'main',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'federation',
      id: 1,
      name: 'Spanish Football Federation',
      label: 'Federação',
    },
  },
  {
    id: 2,
    name: 'Carlos del Cerro Grande',
    email: 'carlos.grande@laliga.com',
    role: 'assistant',
    avatar: '',
    status: 'retired',
    relatedEntity: {
      type: 'league',
      id: 1,
      name: 'Spanish Football Federation',
      label: 'Federação',
    },
  },
];

export const users: IEntity[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'admin',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'federation',
      id: 1,
      name: 'Spanish Football Federation',
      label: 'Federação',
    },
  },
  {
    id: 2,
    name: 'Maria González',
    email: 'maria.gonzalez@example.com',
    role: 'manager',
    avatar: '',
    status: 'active',
    relatedEntity: {
      type: 'federation',
      id: 1,
      name: 'Spanish Football Federation',
      label: 'Federação',
    },
  },
];
