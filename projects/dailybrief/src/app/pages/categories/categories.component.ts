import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Post, Category } from '../../models/post.model';
import { POSTS, CATEGORIES } from '../../data/mock-data';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { CategoryTagComponent } from '../../components/category-tag/category-tag.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, PostListComponent, CategoryTagComponent],
  template: `
    <div class="container mx-auto px-4 pt-24 pb-12">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">
        {{ categoryName || 'Todas as Categorias' }}
      </h1>

      <!-- Categories Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap">
          <app-category-tag
            *ngFor="let cat of categories"
            [category]="cat"
            [active]="cat.slug === currentCategory"
            (selected)="filterByCategory(cat)"
          ></app-category-tag>
        </div>
      </div>

      <!-- Posts List -->
      <app-post-list [posts]="filteredPosts"></app-post-list>
    </div>
  `,
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = CATEGORIES;
  allPosts: Post[] = POSTS;
  filteredPosts: Post[] = [];
  currentCategory: string = '';
  categoryName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      this.currentCategory = category || '';
      this.filterPosts();
    });
  }

  filterByCategory(category: Category) {
    this.currentCategory = category.slug;
    this.filterPosts();
    // In a real app, this would update the URL
  }

  private filterPosts() {
    if (this.currentCategory) {
      this.filteredPosts = this.allPosts.filter(
        post => post.category.name === this.currentCategory
      );
      const selectedCategory = this.categories.find(
        cat => cat.slug === this.currentCategory
      );
      this.categoryName = selectedCategory ? selectedCategory.name : '';
    } else {
      this.filteredPosts = this.allPosts;
      this.categoryName = '';
    }
  }
}
