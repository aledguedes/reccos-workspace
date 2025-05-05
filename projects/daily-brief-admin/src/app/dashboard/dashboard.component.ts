import { ChartComponent } from './../components/chart/chart.components';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ChartComponent],
  template: `
    <main class="container mx-auto p-8 max-w-7xl">
      <h1
        class="text-3xl font-bold text-gray-800 mb-6 tracking-tight animate-fade-in"
      >
        Dashboard
      </h1>

      <!-- Cards Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-slide-up"
        >
          <h3 class="text-lg font-semibold text-gray-700">Pageviews</h3>
          <p class="text-4xl font-bold text-blue-500 my-2">
            {{ analytics.pageviews.toLocaleString() }}
          </p>
          <p class="text-sm text-gray-500">Total this month</p>
        </div>
        <div
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-slide-up delay-100"
        >
          <h3 class="text-lg font-semibold text-gray-700">Affiliate Clicks</h3>
          <p class="text-4xl font-bold text-green-500 my-2">
            {{ analytics.affiliateClicks.toLocaleString() }}
          </p>
          <p class="text-sm text-gray-500">Total this month</p>
        </div>
        <div
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-slide-up delay-200"
        >
          <h3 class="text-lg font-semibold text-gray-700">Posts Published</h3>
          <p class="text-4xl font-bold text-indigo-500 my-2">
            {{ analytics.postsPublished }}
          </p>
          <p class="text-sm text-gray-500">Total this month</p>
        </div>
        <div
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-slide-up delay-300"
        >
          <h3 class="text-lg font-semibold text-gray-700">Active Users</h3>
          <p class="text-4xl font-bold text-purple-500 my-2">
            {{ analytics.activeUsers.toLocaleString() }}
          </p>
          <p class="text-sm text-gray-500">Total this month</p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-chart
          type="bar"
          [data]="pageviewsData"
          title="Pageviews by Day"
          class="animate-fade-in"
        ></app-chart>
        <app-chart
          type="line"
          [data]="clicksData"
          title="Affiliate Clicks by Day"
          class="animate-fade-in delay-200"
        ></app-chart>
      </div>
    </main>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
      .animate-slide-up {
        animation: slideUp 0.5s ease-out;
      }
      .delay-100 {
        animation-delay: 100ms;
      }
      .delay-200 {
        animation-delay: 200ms;
      }
      .delay-300 {
        animation-delay: 300ms;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  analytics = {
    pageviews: 12500,
    affiliateClicks: 3200,
    postsPublished: 45,
    activeUsers: 1870,
  };

  pageviewsData = {
    labels: [
      '2025-05-01',
      '2025-05-02',
      '2025-05-03',
      '2025-05-04',
      '2025-05-05',
    ],
    data: [2000, 2500, 3000, 2800, 2700],
  };

  clicksData = {
    labels: [
      '2025-05-01',
      '2025-05-02',
      '2025-05-03',
      '2025-05-04',
      '2025-05-05',
    ],
    data: [500, 600, 700, 650, 680],
  };

  constructor(private router: Router) {
    if (!localStorage.getItem('mock-token')) {
      this.router.navigate(['/login']);
    }
  }
}
