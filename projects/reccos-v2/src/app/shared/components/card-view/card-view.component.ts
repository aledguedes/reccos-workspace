import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  imports: [RouterLink, KeyValuePipe], // Adicione o TitleCasePipe ao array de imports do componente
})
export class CardViewComponent {
  @Input() items: any[] = [];
  @Input() flag: string = '';
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // Lista de propriedades que não devem ser exibidas na lista de campos dinâmicos
  private excludedProperties: string[] = [
    'id',
    'name',
    'email',
    'avatar',
    'createdAt',
    'updatedAt',
    // 'status' removido para permitir exibição na lista de campos dinâmicos
  ];

  constructor() {
    console.log('items', this.items);
  }

  // Método para verificar se uma propriedade deve ser exibida
  shouldDisplay(key: string): boolean {
    return !this.excludedProperties.includes(key);
  }

  // Método para verificar se um valor é um objeto
  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  // Função de comparação personalizada para ordenar as chaves
  originalOrder = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>
  ): number => {
    // Colocar 'status' por último
    if (a.key === 'status') return 1;
    if (b.key === 'status') return -1;
    // Priorizar 'role' no topo
    if (a.key === 'role') return -1;
    if (b.key === 'role') return 1;

    // Ordem alfabética para as demais propriedades
    return a.key.localeCompare(b.key);
  };

  getRoleBadgeColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500'; // Red for admin (as in the image)
      case 'manager':
        return 'bg-orange-500'; // Orange for manager
      case 'editor':
        return 'bg-blue-500'; // Blue for editor
      default:
        return 'bg-gray-500';
    }
  }

  getStatusBadgeVariant(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'border-green-500 text-green-500'; // Green border and text for active
      case 'inactive':
        return 'border-red-200 text-red-500'; // Red border and text for inactive
      default:
        return 'border-gray-500 text-gray-500';
    }
  }

  handleViewFederation(federationId: number): void {
    // Implementar navegação para visualizar federação
    console.log('Visualizar federação:', federationId);
  }
}
