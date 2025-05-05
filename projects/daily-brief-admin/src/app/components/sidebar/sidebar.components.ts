import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside
      class="bg-white w-64 h-screen shadow-lg flex flex-col fixed md:static z-40 transition-transform duration-300"
      [ngClass]="{ '-translate-x-full': !isOpen(), 'translate-x-0': isOpen() }"
    >
      <nav class="flex-1 pt-16 md:pt-0">
        <a
          routerLink="/dashboard"
          routerLinkActive="bg-indigo-100 text-indigo-700"
          class="block text-indigo-600 text-lg p-4 hover:bg-indigo-50 transition-all"
        >
          Dashboard
        </a>
        <a
          routerLink="/users"
          routerLinkActive="bg-indigo-100 text-indigo-700"
          class="block text-indigo-600 text-lg p-4 hover:bg-indigo-50 transition-all"
        >
          Users
        </a>
        <a
          routerLink="/posts"
          routerLinkActive="bg-indigo-100 text-indigo-700"
          class="block text-indigo-600 text-lg p-4 hover:bg-indigo-50 transition-all"
        >
          Posts
        </a>
        <a
          routerLink="/logs"
          routerLinkActive="bg-indigo-100 text-indigo-700"
          class="block text-indigo-600 text-lg p-4 hover:bg-indigo-50 transition-all"
        >
          Logs
        </a>
      </nav>
      <button
        class="bg-indigo-600 text-white w-full p-4 hover:bg-indigo-700 rounded-b-xl transition-all"
        (click)="logout()"
      >
        Logout
      </button>
    </aside>
  `,
  styles: [
    `
      @media (min-width: 768px) {
        aside {
          transform: translateX(0) !important;
        }
      }
    `,
  ],
})
export class SidebarComponent {
  isOpen = signal(false);

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('mock-token');
    this.router.navigate(['/login']);
  }
}
