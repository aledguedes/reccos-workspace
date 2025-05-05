import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium mb-2">Pageviews</h3>
          <p class="text-3xl font-bold text-blue-500">12,500</p>
          <p class="text-sm text-gray-500 mt-2">Total pageviews this month</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium mb-2">Clicks</h3>
          <p class="text-3xl font-bold text-green-500">3,200</p>
          <p class="text-sm text-gray-500 mt-2">Total clicks this month</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {
}