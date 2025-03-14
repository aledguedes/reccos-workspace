import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-federations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Federations Management</h1>
      <p>
        Welcome to the federations management dashboard. This is where managers
        can manage federations.
      </p>
    </div>
  `,
  styles: [],
})
export class FederationsComponent {
  constructor() {}
}
