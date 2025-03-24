import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // Inputs para receber dados do componente pai
  @Input() currentPageTitle = '';
  @Input() navbarLinks: { name: string; path: string }[] = [];
  @Input() isSidebarOpen = false;

  // Output para emitir evento para o componente pai
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  // Método para alternar a visibilidade da sidebar em dispositivos móveis
  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }
}
