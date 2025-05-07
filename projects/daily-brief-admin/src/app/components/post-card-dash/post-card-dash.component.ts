import { Component, Input } from '@angular/core';
import { Post } from '../../../../data/modelMock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card-dash',
  imports: [CommonModule],
  templateUrl: './post-card-dash.component.html',
  styleUrl: './post-card-dash.component.scss',
})
export class PostCardDashComponent {
  @Input() posts: Post[] = [];
  @Input() selectedLanguage: 'pt-BR' | 'en' | 'es' = 'pt-BR';
}
