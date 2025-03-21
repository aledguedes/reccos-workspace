import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full">
      <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
        {{ title }}
      </h3>
      <div class="flex items-baseline">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{
          value
        }}</span>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {{ description }}
      </p>
    </div>
  `,
  styles: [],
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = 0;
  @Input() description: string = '';
}
