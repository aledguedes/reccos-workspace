import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Log {
  id: number;
  timestamp: string;
  level: string;
  message: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Logs</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let log of logs" class="hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap">{{ log.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ log.timestamp }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ log.level }}</td>
              <td class="px-6 py-4">{{ log.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class LogsComponent {
  logs: Log[] = [
    { id: 1, timestamp: '2024-05-05 10:00:00', level: 'INFO', message: 'User logged in' },
    { id: 2, timestamp: '2024-05-05 10:05:00', level: 'WARNING', message: 'Failed login attempt' },
    { id: 3, timestamp: '2024-05-05 10:10:00', level: 'INFO', message: 'Post created' },
    { id: 4, timestamp: '2024-05-05 10:15:00', level: 'ERROR', message: 'Database connection error' },
    { id: 5, timestamp: '2024-05-05 10:20:00', level: 'INFO', message: 'User updated profile' },
  ];
}