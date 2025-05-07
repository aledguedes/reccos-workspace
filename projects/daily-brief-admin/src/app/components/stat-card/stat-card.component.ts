import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardCard, DashboardSummary } from '../../../../data/modelMock';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() stat: DashboardCard = {
    title: '',
    value: '',
    icon: '',
    iconBgColor: '',
    iconColor: '',
  };
}
