import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  blogDashboardCards,
  mockLogs,
  mockPosts,
} from '../../../data/mockData';
import { LogItemComponent } from '../components/log-item/log-item.component';
import { StatCardComponent } from '../components/stat-card/stat-card.component';
import { PostCardDashComponent } from '../components/post-card-dash/post-card-dash.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LogItemComponent,
    StatCardComponent,
    PostCardDashComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedLanguage = 'pt-BR';
  blogDashboardCards = blogDashboardCards;
  mockPosts = mockPosts;
  mockLogs = mockLogs;

  postsByStatusChart = {
    labels: ['Aprovado', 'Pendente', 'Rejeitado'],
    datasets: [
      {
        label: 'Posts',
        data: [12, 7, 3],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
      },
    ],
  };

  viewsOverTimeChart = {
    labels: [
      '2025-05-01',
      '2025-05-02',
      '2025-05-03',
      '2025-05-04',
      '2025-05-05',
      '2025-05-06',
      '2025-05-07',
    ],
    datasets: [
      {
        label: 'Visualizações',
        data: [200, 350, 400, 320, 500, 450, 600],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  trafficSourcesChart = {
    labels: ['Orgânico', 'Social', 'Referência', 'Direto'],
    datasets: [
      {
        label: 'Fontes de Tráfego',
        data: [45, 25, 20, 10],
        backgroundColor: ['#6366f1', '#f59e42', '#10b981', '#f43f5e'],
      },
    ],
  };

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
    // if (!localStorage.getItem('mock-token')) {
    //   this.router.navigate(['/login']);
    // }
  }
}
