import { Component, EventEmitter, Output, signal } from '@angular/core';
import { IFederation, IUser } from '../../core/models/user.models';
import { SimpleGridComponent } from '../../shared/components/simple-grid/simple-grid.component';
import { CardViewComponent } from '../../shared/components/card-view/card-view.component';
import { IUserMock, usersMock } from '../../core/models/mocks.models';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';

type ViewLayout = 'grid' | 'simple' | 'table';

export interface ILayout {
  value: ViewLayout;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-users-list',
  imports: [SimpleGridComponent, CardViewComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  @Output() search = new EventEmitter<string>();

  mappedUsers: IUser[] = [];
  filteredUsers: IUserMock[] = [];

  // Add this with your other signals
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);
  currentLayout = signal<ViewLayout>('grid');

  layouts: ILayout[] = [
    { value: 'grid', label: 'Grid View', icon: 'ri-layout-grid-line' },
    { value: 'table', label: 'Table View', icon: 'ri-table-line' },
    { value: 'simple', label: 'Simple Card View', icon: 'ri-layout-card-line' },
  ];

  // Mock data for users
  users: IUserMock[] = usersMock;
  constructor(
    private router: Router,
    private toastService: ToastService
  ) {
    this.filteredUsers = [...this.users];

    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); // 1.5 second fake loading time
  }

  setLayout(layout: ViewLayout): void {
    this.currentLayout.set(layout);
  }

  navigateToNewUser(): void {
    this.router.navigate(['/users/new']);
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.search.emit(value);
    this.filterUsers(); // Call filter function when search changes
  }

  filterUsers(): void {
    const query = this.searchQuery().toLowerCase();
    this.filteredUsers = this.users.filter(
      user =>
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        false
    );
  }
}
