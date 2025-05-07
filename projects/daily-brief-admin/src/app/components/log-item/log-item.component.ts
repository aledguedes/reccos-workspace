import { Component, Input } from '@angular/core';
import { Log } from '../../../../data/modelMock';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.scss',
})
export class LogItemComponent {
  @Input() logs: Log[] = [];

  getActionIcon(action: string): string {
    switch (action) {
      case 'Post aprovado':
        return `<svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>`;
      case 'Post rejeitado':
        return `<svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>`;
      case 'Post criado':
        return `<svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /></svg>`;
      default:
        return `<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }
  }

  getActionClass(action: string): string {
    switch (action) {
      case 'Post aprovado':
        return 'bg-green-50 border-green-200';
      case 'Post rejeitado':
        return 'bg-red-50 border-red-200';
      case 'Post criado':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  }
}
