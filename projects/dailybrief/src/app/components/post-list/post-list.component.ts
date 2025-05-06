import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostCardComponent],
  template: `
    <section class="py-8 md:py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">{{ title }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (post of posts; track post.id) {
            <app-post-card [post]="post"></app-post-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Input() title: string = '';
}
