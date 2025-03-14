import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Leagues Management</h1>
      <p>
        Welcome to the leagues management dashboard. This is where
        administrators can manage leagues.
      </p>
    </div>
  `,
  styles: [],
})
export class LeaguesComponent {
  constructor() {}
}
