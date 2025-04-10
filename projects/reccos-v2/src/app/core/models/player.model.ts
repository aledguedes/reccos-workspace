export interface IPlayer {
  id?: number;
  name: string; // Nome completo do jogador
  birthDate: string | Date; // Data de nascimento
  document: string; // CPF ou documento de identidade
  photo?: string; // Foto do jogador (opcional)
  phone: string; // Telefone para contato
  email?: string; // Email (opcional)
  position: string; // Posição principal no campo
  teamId?: number; // ID do time atual
  teamName?: string; // Nome do time atual
  jerseyNumber?: number; // Número da camisa (opcional)
  emergencyContact?: {
    name: string; // Nome do contato de emergência
    phone: string; // Telefone do contato de emergência
    relationship?: string; // Relacionamento com o jogador (opcional)
  };
  status: 'pending' | 'approved' | 'suspended' | 'inactive'; // Status de regularização
  createdAt?: string | Date; // Data de inscrição
  updatedAt?: string | Date; // Data de atualização
  // Campos adicionais que podem ser úteis
  address?: string; // Endereço (opcional)
  city?: string; // Cidade (opcional)
  state?: string; // Estado (opcional)
  bloodType?: string; // Tipo sanguíneo (opcional)
  allergies?: string; // Alergias (opcional)
  medicalConditions?: string; // Condições médicas (opcional)
}

export const PLAYER_POSITIONS = [
  { value: 'goalkeeper', label: 'Goleiro' },
  { value: 'defender', label: 'Zagueiro' },
  { value: 'right-back', label: 'Lateral Direito' },
  { value: 'left-back', label: 'Lateral Esquerdo' },
  { value: 'defensive-midfielder', label: 'Volante' },
  { value: 'midfielder', label: 'Meio-Campista' },
  { value: 'attacking-midfielder', label: 'Meia Atacante' },
  { value: 'right-winger', label: 'Ponta Direita' },
  { value: 'left-winger', label: 'Ponta Esquerda' },
  { value: 'forward', label: 'Atacante' },
  { value: 'striker', label: 'Centroavante' },
  { value: 'other', label: 'Outra' },
];
