import { Component, input, Input } from '@angular/core';
import { IUser } from '../../../core/models/user.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simple-grid',
  imports: [RouterLink],
  templateUrl: './simple-grid.component.html',
  styleUrl: './simple-grid.component.scss',
})
export class SimpleGridComponent {
  @Input() users: IUser[] = [];
  @Input() flag: string = '';
  mappedUsers: IUser[] = [];

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

  handleViewFederation(federationId: number): void {
    // Implementar navegação para visualizar federação
    console.log('Visualizar federação:', federationId);
  }
}
