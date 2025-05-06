import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { CategoryTagComponent } from '../category-tag/category-tag.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CategoryTagComponent, RouterLink],
  template: `
    <section class="py-12 md:py-24 lg:py-32 bg-background">
      <div class="container mx-auto px-4 md:px-6">
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div class="flex-1 space-y-4">
            @if (post.category) {
              <app-category-tag [category]="post.category"></app-category-tag>
            }
            <h1
              class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              {{ post.title }}
            </h1>
            <p class="max-w-[700px] text-muted-foreground md:text-xl">
              {{ post.excerpt }}
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <a
                [routerLink]="['/post', post.id]"
                class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors inline-flex items-center justify-center text-sm font-medium h-10"
              >
                Explorar Ferramentas
              </a>
              <a
                [routerLink]="['/post', post.id]"
                class="border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex h-10 items-center justify-center rounded px-4 py-2 text-sm font-medium"
              >
                Saiba Mais
              </a>
            </div>
          </div>
          @if (post.image) {
            <div class="flex-1 flex justify-center">
              <img
                [src]="post.image"
                [alt]="post.title"
                class="max-w-full h-auto object-cover rounded-lg"
              />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* Estilos exclusivos do HeroComponent */
      .bg-background {
        background-color: hsl(var(--background));
      }
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class HeroComponent {
  @Input() post: Post = {
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    date: '',
    readTime: '',
    category: {
      id: 0,
      name: '',
      slug: '',
    },
  };
}
