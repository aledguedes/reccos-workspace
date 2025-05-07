import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mobileMenuOpen = false;
  private router = inject(Router);

  navItems = [
    { title: 'Dashboard', path: '/', icon: 'layout-dashboard' },
    { title: 'Posts', path: '/posts', icon: 'file-text' },
    { title: 'Logs', path: '/logs', icon: 'clock' },
    { title: 'Usuários', path: '/users', icon: 'users' },
    { title: 'Analytics', path: '/analytics', icon: 'bar-chart' },
    { title: 'Configurações', path: '/settings', icon: 'settings' },
  ];

  handleLogout() {
    this.router.navigate(['/login']);
  }
}
