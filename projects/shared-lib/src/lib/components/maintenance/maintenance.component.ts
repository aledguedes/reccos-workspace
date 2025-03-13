import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-maintenance',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './maintenance.component.html',
})
export class MaintenanceComponent {
  @Input() maintenanceEndTime: Date = new Date(Date.now() + 2 * 60 * 60 * 1000);
  @Input() returnUrl: string = '/auth/login';
  @Input() contactInfo: string = '';
  @Input() socialLinks: { name: string; url: string }[] = [];
}
