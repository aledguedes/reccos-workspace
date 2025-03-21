import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILeagueCard } from '../../../core/models/league.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() card: ILeagueCard = {
    title: '',
    value: '',
    trend: { positive: true, value: 0, lastMonthValue: 0 },
    icon: '',
  };
}
