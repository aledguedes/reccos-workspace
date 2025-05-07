import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../../data/modelMock';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post: Post = {
    id: '',
    slug: '',
    title: {
      'pt-BR': '',
      en: '',
      es: '',
    },
    content: {
      'pt-BR': '',
      en: '',
      es: '',
    },
    excerpt: {
      'pt-BR': '',
      en: '',
      es: '',
    },
    status: 'pending',
    category: '',
    author: '',
    tags: [],
    createdAt: '',
    updatedAt: '',
    monetization: {
      adsenseEnabled: false,
      affiliateLinks: [],
    },
    versions: [],
    featuredImage: '',
  };
  @Input() selectedLanguage: 'pt-BR' | 'en' | 'es' = 'pt-BR';

  @Output() onApprove = new EventEmitter<string>();
  @Output() onReject = new EventEmitter<string>();
  @Output() onView = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();

  statusColors: any = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
  };
}
