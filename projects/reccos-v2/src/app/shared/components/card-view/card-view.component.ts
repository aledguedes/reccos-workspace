import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EntityTypeMap, IEntity } from '../../../core/models/mocks.models';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  imports: [RouterLink, TitleCasePipe], // Adicione o TitleCasePipe e JsonPipe ao array de imports do componente
})
export class CardViewComponent {
  @Input() items: IEntity[] = [];
  @Input() flag: keyof EntityTypeMap = 'users';
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // Lista de propriedades que não devem ser exibidas na lista de campos dinâmicos
  getRoleBadgeColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'badge-error'; // Vermelho para admin
      case 'manager':
        return 'badge-warning'; // Laranja para manager
      case 'editor':
        return 'badge-info'; // Azul para editor
      default:
        return 'badge-neutral';
    }
  }

  getStatusBadgeVariant(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'badge-soft badge-success';
      case 'pending':
        return 'badge-soft badge-warning';
      case 'inactive':
        return 'badge-soft badge-error';
      default:
        return 'badge-soft badge-neutral';
    }
  }
}
