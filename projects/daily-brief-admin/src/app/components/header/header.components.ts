import { FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header
      class="h-16 bg-indigo-600 text-white shadow-md flex items-center justify-between px-4 fixed w-full z-50"
    >
      <div class="flex items-center">
        <button
          class="md:hidden text-white hover:bg-indigo-700 p-2 rounded-md"
          (click)="toggleSidebar()"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <h1 class="text-xl font-bold tracking-tight">DailyBrief Admin</h1>
      </div>
      <div class="flex items-center space-x-4">
        <select
          [ngModel]="language()"
          (ngModelChange)="language.set($event)"
          class="bg-white text-indigo-600 border-indigo-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-all"
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <button
          class="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-gray-100 transition-all"
          (click)="logout()"
        >
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        @apply font-sans;
      }
    `,
  ],
})
export class HeaderComponent {
  language = signal('pt');
  sidebarOpen = signal(false);

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

  logout() {
    localStorage.removeItem('mock-token');
    this.router.navigate(['/login']);
  }
}
