import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  imports: [RouterLink], // Adicione o TitleCasePipe ao array de imports do componente
})
export class CardViewComponent {
  @Input() items: any[] = [];
  @Input() flag: string = '';
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {
    console.log('items', this.items);
  }

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
