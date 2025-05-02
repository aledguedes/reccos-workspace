import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full flex flex-col"
    >
      @if (post.image) {
        <div class="aspect-video overflow-hidden">
          <img
            [src]="post.image"
            [alt]="post.title"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      }
      <div class="p-4 pb-0">
        <div class="flex justify-between items-center mb-2">
          <time class="text-sm text-muted-foreground">{{ post.date }}</time>
          <span
            class="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary/20 text-secondary"
          >
            {{ post.category.name }}
          </span>
        </div>
        <h3 class="font-semibold text-xl">{{ post.title }}</h3>
      </div>
      <div class="p-4 pt-2 flex-grow">
        <p class="text-muted-foreground">{{ post.excerpt }}</p>
      </div>
      <div class="p-4 pt-0">
        <a
          [routerLink]="['/post', post.id]"
          class="text-sm font-medium text-primary hover:underline read-more-link inline-flex items-center"
        >
          Ler Mais
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
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      /* Estilos exclusivos do PostCardComponent */
      .bg-card {
        background-color: hsl(var(--card));
      }
      .text-card-foreground {
        color: hsl(var(--card-foreground));
      }
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
      .text-primary {
        color: hsl(var(--primary));
      }
      .text-secondary {
        color: hsl(var(--secondary));
      }
    `,
  ],
})
export class PostCardComponent {
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
