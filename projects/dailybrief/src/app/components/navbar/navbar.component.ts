import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CATEGORIES } from '../../data/mock-data';
import { Category } from '../../models/post.model';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark-navbar"
    >
      <div class="container mx-auto flex h-16 items-center px-4">
        <div class="mr-4 flex">
          <a [routerLink]="['/']" class="flex items-center">
            <h1 class="text-2xl font-bold">DailyBrief</h1>
          </a>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-4">
          <nav class="hidden md:flex items-center space-x-4">
            <a
              [routerLink]="['/']"
              routerLinkActive="text-primary"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-sm font-medium hover:text-primary"
            >
              Home
            </a>
            <a
              [routerLink]="['/categorias']"
              routerLinkActive="text-primary"
              class="text-sm font-medium hover:text-primary"
            >
              Artigos
            </a>
            <div class="relative group">
              <button
                class="text-sm font-medium flex items-center hover:text-primary"
              >
                Categorias
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                class="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg hidden group-hover:block"
              >
                <div class="py-1 text-sm">
                  <a
                    [routerLink]="['/categorias', 'ia-technology']"
                    class="block px-4 py-2 hover:bg-accent hover:text-foreground"
                  >
                    IA Technology
                  </a>
                  <a
                    [routerLink]="['/categorias', 'machine-learning']"
                    class="block px-4 py-2 hover:bg-accent hover:text-foreground"
                  >
                    Machine Learning
                  </a>
                  <a
                    [routerLink]="['/categorias', 'data-science']"
                    class="block px-4 py-2 hover:bg-accent hover:text-foreground"
                  >
                    Data Science
                  </a>
                  <a
                    [routerLink]="['/categorias', 'ai-ethics']"
                    class="block px-4 py-2 hover:bg-accent hover:text-foreground"
                  >
                    AI Ethics
                  </a>
                </div>
              </div>
            </div>
            <a
              [routerLink]="['/sobre']"
              routerLinkActive="text-primary"
              class="text-sm font-medium hover:text-primary"
            >
              Sobre
            </a>
          </nav>
          <button
            id="theme-toggle"
            class="rounded-full p-2 hover:bg-accent"
            aria-label="Toggle theme"
            (click)="toggleTheme()"
          >
            <svg
              id="moon-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="hidden"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <svg
              id="sun-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      /* Estilos exclusivos do NavbarComponent */
      .bg-card {
        background-color: hsl(var(--card));
      }
      .text-foreground {
        color: hsl(var(--foreground));
      }
      .text-primary {
        color: hsl(var(--primary));
      }
      .hover\\:text-foreground:hover {
        color: hsl(var(--foreground));
      }
      .hover\\:bg-accent:hover {
        background-color: hsl(var(--accent));
      }
      .dark-navbar {
        background-color: hsl(var(--background) / 75%);
        backdrop-filter: blur(10px);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      }
    `,
  ],
})
export class NavbarComponent {
  categories: Category[] = CATEGORIES;
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
