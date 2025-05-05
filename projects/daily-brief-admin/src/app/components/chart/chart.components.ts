import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">{{ title }}</h3>
      <canvas [id]="chartId" class="w-full h-32"></canvas>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class ChartComponent implements AfterViewInit {
  @Input() type: 'bar' | 'line' = 'bar';
  @Input() data: { labels: string[]; data: number[] } = {
    labels: [],
    data: [],
  };
  @Input() title: string = '';
  chartId = `chart-${Math.random().toString(36).substring(2, 9)}`;

  ngAfterViewInit() {
    new Chart(this.chartId, {
      type: this.type,
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: this.title,
            data: this.data.data,
            backgroundColor:
              this.type === 'bar'
                ? 'rgba(59, 130, 246, 0.8)'
                : 'rgba(34, 197, 94, 0.8)',
            borderColor:
              this.type === 'bar'
                ? 'rgba(59, 130, 246, 1)'
                : 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
            fill: this.type === 'line' ? 'origin' : false,
            tension: this.type === 'line' ? 0.3 : 0,
            pointBackgroundColor:
              this.type === 'line' ? 'rgba(34, 197, 94, 1)' : undefined,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(229, 231, 235, 0.5)' } },
          x: { grid: { display: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: 'rgba(55, 65, 81, 0.9)', padding: 12 },
        },
      },
    });
  }
}
