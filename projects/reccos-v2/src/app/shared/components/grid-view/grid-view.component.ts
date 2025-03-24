import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent {
  @Input() items: any[] = [];
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

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
