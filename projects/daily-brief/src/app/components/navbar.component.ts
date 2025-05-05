import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed top-0 w-full bg-[var(--primary-bg)] shadow-sm z-10">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <a routerLink="/" class="text-2xl font-bold">DailyBrief</a>
        <div class="space-x-6">
          <a routerLink="/" class="hover:text-[var(--accent)]">Início</a>
          <a routerLink="/categories" class="hover:text-[var(--accent)]"
            >Categorias</a
          >
          <a routerLink="/about" class="hover:text-[var(--accent)]">Sobre</a>
          <a routerLink="/contact" class="hover:text-[var(--accent)]"
            >Contato</a
          >
          <button
            (click)="toggleTheme()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {{ themeService.getCurrentTheme() === 'light' ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
