import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      <div class="text-xl font-bold">DailyBrief Admin</div>
      <div class="flex items-center">
        <select class="bg-gray-700 text-white rounded-md p-2 mr-4">
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {}
