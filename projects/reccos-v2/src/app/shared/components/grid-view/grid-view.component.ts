import { RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IUser } from '../../../core/models/user.models';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent {
  @Input() items: any[] = [];
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

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

  getStatusBadge(status: string): { variant: string; label: string } {
    switch (status) {
      case 'active':
        return { variant: 'badge-success', label: 'Ativo' };
      case 'inactive':
        return { variant: 'badge-error', label: 'Inativo' };
      case 'pending':
        return { variant: 'badge-warning', label: 'Pendente' };
      case 'completed':
        return { variant: 'badge-info', label: 'Concluído' };
      default:
        return { variant: 'badge-ghost', label: status };
    }
  }
}
