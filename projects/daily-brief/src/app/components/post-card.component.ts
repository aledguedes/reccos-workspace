import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IPost } from '../model/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="rounded-lg border-[0.5px] border-gray-200 text-[var(--primary-text)] shadow-sm overflow-hidden h-full flex flex-col dark:border-gray-900 bg-[var(--card-bg-color)]"
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
        <div class="flex justify-between items-center mb-4 mt-4">
          <time class="text-sm text-[var(--secondary-text)]">{{
            post.date
          }}</time>
          <span
            class="ml-2 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
          >
            {{ post.category.name }}
          </span>
        </div>
        <h3 class="font-semibold text-xl mb-4">{{ post.title }}</h3>
      </div>
      <div class="p-4 pt-2 flex-grow">
        <p class="text-[var(--secondary-text)]">{{ post.excerpt }}</p>
      </div>
      <div class="p-4 pt-0">
        <a
          [routerLink]="['/post', post.id]"
          class="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center"
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
  styles: [],
})
export class PostCardComponent {
  @Input() post: IPost = {
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
