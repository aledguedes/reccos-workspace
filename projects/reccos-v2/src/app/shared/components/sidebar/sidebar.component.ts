import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // Inputs para receber dados do componente pai
  @Input() isSidebarOpen = false;
  @Input() isSidebarExpanded = true;
  @Input() sidebarLinks: any[] = [];

  // Outputs para emitir eventos para o componente pai
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() toggleSidebarExpansionEvent = new EventEmitter<void>();

  // Método para alternar a visibilidade da sidebar em dispositivos móveis
  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  // Método para alternar o estado de expansão da sidebar
  toggleSidebarExpansion(): void {
    this.toggleSidebarExpansionEvent.emit();
  }
}
