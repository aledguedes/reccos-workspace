import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/post.model';

@Component({
  selector: 'app-category-tag',
  standalone: true,
  template: `
    <button
      [class]="
        'px-4 py-2 rounded-full text-sm font-medium transition-colors ' +
        (active
          ? 'bg-[#1E88E5] text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
      "
      (click)="onClick()"
    >
      {{ category.name }}
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class CategoryTagComponent {
  @Input() category!: Category;
  @Input() active: boolean = false;
  @Output() selected = new EventEmitter<Category>();

  onClick() {
    this.selected.emit(this.category);
  }
}
