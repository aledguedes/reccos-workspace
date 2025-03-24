import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="badge {{ variant }}">{{ label }}</div>
  `,
  styles: [`
    .badge {
      &.badge-success {
        background-color: rgba(0, 200, 83, 0.1);
        color: rgb(0, 200, 83);
      }
      
      &.badge-error {
        background-color: rgba(244, 67, 54, 0.1);
        color: rgb(244, 67, 54);
      }
      
      &.badge-warning {
        background-color: rgba(255, 152, 0, 0.1);
        color: rgb(255, 152, 0);
      }
      
      &.badge-info {
        background-color: rgba(33, 150, 243, 0.1);
        color: rgb(33, 150, 243);
      }
      
      &.badge-ghost {
        background-color: rgba(120, 120, 120, 0.1);
        color: rgb(120, 120, 120);
      }
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  
  get variant(): string {
    switch (this.status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-error';
      case 'pending': return 'badge-warning';
      case 'completed': return 'badge-info';
      default: return 'badge-ghost';
    }
  }
  
  get label(): string {
    switch (this.status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      case 'completed': return 'Concluído';
      default: return this.status;
    }
  }
}