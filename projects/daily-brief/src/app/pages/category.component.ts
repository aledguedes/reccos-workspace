import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostListComponent } from '../components/post-list.component';
import { IPost } from '../model/post.model';
import { ICategory } from '../model/category.model';
import { CATEGORIES, POSTS } from '../data/mock-data';
import { CategoryTagComponent } from '../components/category-tag.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, PostListComponent, CategoryTagComponent],
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
  styles: [],
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = CATEGORIES;
  allPosts: IPost[] = POSTS;
  filteredPosts: IPost[] = [];
  currentCategory: string = '';
  categoryName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      this.currentCategory = category || '';
      this.filterPosts();
    });
  }

  filterByCategory(category: ICategory) {
    this.currentCategory = category.slug;
    this.filterPosts();
    // In a real app, this would update the URL
  }

  private filterPosts() {
    if (this.currentCategory) {
      this.filteredPosts = this.allPosts.filter(
        (post) => post.category.name === this.currentCategory
      );
      const selectedCategory = this.categories.find((cat) => cat.slug === this.currentCategory);
      this.categoryName = selectedCategory ? selectedCategory.name : '';
    } else {
      this.filteredPosts = this.allPosts;
      this.categoryName = '';
    }
  }
}
