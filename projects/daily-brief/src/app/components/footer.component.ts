import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../model/category.model';
import { CATEGORIES } from '../data/mock-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class=" bg-[var(--card-bg-color)]">
      <div
        class="container mx-auto py-8 md:py-12 px-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold">DailyBrief</h3>
            <p class="text-sm text-muted-foreground">
              O seu portal de notícias e insights sobre tecnologia e
              inteligência artificial.
            </p>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold">Links</h4>
            <ul class="space-y-2">
              <li>
                <a
                  [routerLink]="['/']"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >Home</a
                >
              </li>
              <li>
                <a
                  [routerLink]="['/categorias']"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >Artigos</a
                >
              </li>
              <li>
                <a
                  [routerLink]="['/categorias']"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >Categorias</a
                >
              </li>
              <li>
                <a
                  [routerLink]="['/sobre']"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >Sobre</a
                >
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold">Categorias</h4>
            <ul class="space-y-2">
              @for (category of categories; track category.id) {
                <li>
                  <a
                    [routerLink]="['/categorias', category.slug]"
                    class="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {{ category.name }}
                  </a>
                </li>
              }
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="text-sm font-semibold">Contato</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="mailto:contato@dailybrief.com"
                  class="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  [routerLink]="['/']"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >Newsletter</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-muted-foreground hover:text-foreground"
                  >RSS</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 my-8"></div>
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-muted-foreground">
            &copy; 2025 DailyBrief. Todos os direitos reservados.
          </p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              class="text-sm text-muted-foreground hover:text-foreground"
              >Termos</a
            >
            <a
              href="#"
              class="text-sm text-muted-foreground hover:text-foreground"
              >Privacidade</a
            >
            <a
              href="#"
              class="text-sm text-muted-foreground hover:text-foreground"
              >Cookies</a
            >
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .bg-background {
        background-color: hsl(var(--background));
      }
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
      .text-foreground {
        color: hsl(var(--foreground));
      }
      .hover\\:text-foreground:hover {
        color: hsl(var(--foreground));
      }
    `,
  ],
})
export class FooterComponent {
  categories: ICategory[] = CATEGORIES;
}
