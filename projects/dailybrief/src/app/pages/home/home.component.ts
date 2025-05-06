import { Component, OnInit } from '@angular/core';
import { Post, Category } from '../../models/post.model';
import { POSTS, CATEGORIES } from '../../data/mock-data';
import { HeroComponent } from '../../components/hero/hero.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, PostListComponent, NewsletterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-background text-foreground">
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
})
export class HomeComponent implements OnInit {
  featuredPost: Post = {
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
  recentPosts: Post[] = [];
  techPosts: Post[] = [];
  aiPosts: Post[] = [];

  ngOnInit() {
    this.featuredPost = POSTS[0];
    this.recentPosts = POSTS.slice(0, 3);
    this.techPosts = POSTS.filter(post => post.category.name === 'Tecnologia');
    this.aiPosts = POSTS.filter(post => post.category.name.includes('IA'));
  }
}
