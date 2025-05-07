import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { IPost } from '../../../../daily-brief/src/app/model/post.model';

interface Post {
  id: number;
  title: { pt: string; en: string; es: string };
  excerpt: { pt: string; en: string; es: string };
  content: { pt: string; en: string; es: string };
  image: string;
  author: string;
  tags: string[];
  category: string;
  metaDescription: { pt: string; en: string; es: string };
  affiliateLinks: { pt: string; en: string; es: string };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
  readTime: string;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Posts</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let post of posts" class="hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap">{{ post.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ post.title[currentLanguage] }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  [ngClass]="getStatusClass(post.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ post.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  (click)="approvePost(post.id)"
                  class="text-green-600 hover:text-green-900 mr-2"
                >
                  Approve
                </button>
                <button
                  (click)="rejectPost(post.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Create New Post</h3>
        <form (submit)="createPost()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="title-pt"
                class="block text-sm font-medium text-gray-700"
                >Title (PT)</label
              >
              <input
                type="text"
                id="title-pt"
                [(ngModel)]="newPost.title.pt"
                name="title-pt"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                for="title-en"
                class="block text-sm font-medium text-gray-700"
                >Title (EN)</label
              >
              <input
                type="text"
                id="title-en"
                [(ngModel)]="newPost.title.en"
                name="title-en"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                for="title-es"
                class="block text-sm font-medium text-gray-700"
                >Title (ES)</label
              >
              <input
                type="text"
                id="title-es"
                [(ngModel)]="newPost.title.es"
                name="title-es"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class PostsComponent implements OnInit {
  private postService = inject(PostService);
  posts: Post[] = [];
  currentLanguage: 'pt' | 'en' | 'es' = 'pt';
  newPost: Post = {
    id: 0,
    title: { pt: '', en: '', es: '' },
    excerpt: { pt: '', en: '', es: '' },
    content: { pt: '', en: '', es: '' },
    image: '',
    author: 'Admin',
    tags: [],
    category: '',
    metaDescription: { pt: '', en: '', es: '' },
    affiliateLinks: { pt: '', en: '', es: '' },
    status: 'PENDING',
    date: '',
    readTime: '',
  };

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    this.postService.getAllPosts().subscribe({
      next: (response: IPost[]) => {
        // this.posts = response;
        console.log('GET ALL POSTS RESPONSE', response);
      },
      error: err => {
        console.log('GET ALL POSTS ERROR', err);
      },
    });
  }

  getStatusClass(status: 'PENDING' | 'APPROVED' | 'REJECTED'): string {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  }

  approvePost(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.status = 'APPROVED';
      console.log(`Post ${postId} approved`);
    }
  }

  rejectPost(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.status = 'REJECTED';
      console.log(`Post ${postId} rejected`);
    }
  }

  createPost(): void {
    this.newPost.id = this.posts.length + 1;
    this.posts.push(this.newPost);
    this.newPost = {
      id: 0,
      title: { pt: '', en: '', es: '' },
      excerpt: { pt: '', en: '', es: '' },
      content: { pt: '', en: '', es: '' },
      image: '',
      author: 'Admin',
      tags: [],
      category: '',
      metaDescription: { pt: '', en: '', es: '' },
      affiliateLinks: { pt: '', en: '', es: '' },
      status: 'PENDING',
      date: '',
      readTime: '',
    };
    console.log('Post created');
  }
}
