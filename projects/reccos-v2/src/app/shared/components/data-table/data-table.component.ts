import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  header: string;
  field: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto relative shadow-sm rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            @for (column of columns; track column.field) {
              <th
                scope="col"
                class="py-3 px-6"
                [class.cursor-pointer]="column.sortable"
                (click)="column.sortable ? sort(column.field) : null"
              >
                {{ column.header }}
                @if (column.sortable) {
                  <span class="ml-1">
                    @if (
                      sortField === column.field && sortDirection === 'asc'
                    ) {
                      <i class="ri-arrow-up-s-line"></i>
                    } @else if (
                      sortField === column.field && sortDirection === 'desc'
                    ) {
                      <i class="ri-arrow-down-s-line"></i>
                    } @else {
                      <i class="ri-arrow-up-down-line text-gray-300"></i>
                    }
                  </span>
                }
              </th>
            }
            @if (showActions) {
              <th scope="col" class="py-3 px-6 text-right">Ações</th>
            }
          </tr>
        </thead>
        <tbody>
          @if (data && data.length > 0) {
            @for (item of data; track trackBy(item)) {
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                @for (column of columns; track column.field) {
                  <td class="py-4 px-6">{{ item[column.field] }}</td>
                }
                @if (showActions) {
                  <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                      <button
                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        (click)="onView.emit(item)"
                      >
                        <i class="ri-eye-line"></i>
                      </button>
                      <button
                        class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        (click)="onEdit.emit(item)"
                      >
                        <i class="ri-edit-line"></i>
                      </button>
                      <button
                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        (click)="onDelete.emit(item)"
                      >
                        <i class="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                }
              </tr>
            }
          } @else {
            <tr class="bg-white dark:bg-gray-800">
              <td
                [attr.colspan]="
                  showActions ? columns.length + 1 : columns.length
                "
                class="py-4 px-6 text-center"
              >
                {{ emptyMessage }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (showPagination) {
      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-700 dark:text-gray-400">
          Mostrando <span class="font-medium">{{ startItem }}</span> a
          <span class="font-medium">{{ endItem }}</span> de
          <span class="font-medium">{{ totalItems }}</span> resultados
        </div>
        <div class="flex space-x-2">
          <button
            class="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            [disabled]="currentPage === 1"
            (click)="changePage(currentPage - 1)"
          >
            Anterior
          </button>
          <button
            class="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            [disabled]="currentPage === totalPages"
            (click)="changePage(currentPage + 1)"
          >
            Próximo
          </button>
        </div>
      </div>
    }
  `,
  styles: [],
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showActions: boolean = true;
  @Input() showPagination: boolean = true;
  @Input() emptyMessage: string = 'Nenhum registro encontrado';
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;

  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<{
    field: string;
    direction: 'asc' | 'desc';
  }>();
  @Output() onPageChange = new EventEmitter<number>();

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  trackBy(item: any): any {
    return item.id || item;
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.onSort.emit({ field: this.sortField, direction: this.sortDirection });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.onPageChange.emit(page);
    }
  }
}
