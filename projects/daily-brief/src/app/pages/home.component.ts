import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero.component';
import { PostListComponent } from '../components/post-list.component';
import { IPost } from '../model/post.model';
import { POSTS } from '../data/mock-data';
import { NewsletterComponent } from '../components/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    PostListComponent,
    NewsletterComponent,
  ],
  template: `
    <div
      class="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]"
    >
      <main class="flex-1">
        <app-hero [post]="featuredPost"></app-hero>
        <app-post-list
          [posts]="recentPosts"
          [title]="'Posts Recentes'"
        ></app-post-list>
        <app-post-list
          [posts]="techPosts"
          [title]="'Tecnologia'"
        ></app-post-list>
        <app-post-list
          [posts]="aiPosts"
          [title]="'Inteligência Artificial'"
        ></app-post-list>
        <app-newsletter></app-newsletter>
      </main>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  featuredPost: IPost = {
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
  aiPosts: IPost[] = [];
  techPosts: IPost[] = [];
  recentPosts: IPost[] = [];

  ngOnInit() {
    this.featuredPost = POSTS[0];
    this.recentPosts = POSTS.slice(0, 3);
    this.techPosts = POSTS.filter(post => post.category.name === 'Tecnologia');
    this.aiPosts = POSTS.filter(post => post.category.name.includes('IA'));
  }
}
