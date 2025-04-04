import { Component } from '@angular/core';
import { IFederation, IUser } from '../../core/models/user.models';
import { SimpleGridComponent } from '../../shared/components/simple-grid/simple-grid.component';

@Component({
  selector: 'app-users-list',
  imports: [SimpleGridComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  mappedUsers: IUser[] = [];

  // Mock data for federations
  mockFederations: IFederation[] = [
    {
      id: 1,
      name: 'Spanish Football Federation',
      description: 'The governing body of football in Spain',
      logo: '',
      location: 'Madrid, Spain',
      createdAt: new Date(2023, 0, 1),
      updatedAt: new Date(2024, 0, 1),
    },
    {
      id: 2,
      name: 'Catalan Football Federation',
      description: 'The governing body of football in Catalonia',
      logo: '',
      location: 'Barcelona, Spain',
      createdAt: new Date(2023, 1, 15),
      updatedAt: new Date(2024, 1, 15),
    },
    {
      id: 3,
      name: 'Andalusian Football Federation',
      description: 'The governing body of football in Andalusia',
      logo: '',
      location: 'Seville, Spain',
      createdAt: new Date(2023, 2, 10),
      updatedAt: new Date(2024, 2, 10),
    },
    {
      id: 4,
      name: 'Basque Football Federation',
      description: 'The governing body of football in the Basque Country',
      logo: '',
      location: 'Bilbao, Spain',
      createdAt: new Date(2023, 3, 20),
      updatedAt: new Date(2024, 3, 20),
    },
  ];

  // Mock data for users
  users: IUser[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@example.com',
      role: 'admin',
      avatar: '',
      phone: '+34 600 123 456',
      status: 'active',
      federation: this.mockFederations[0],
      createdAt: new Date(2023, 5, 1),
      updatedAt: new Date(2024, 3, 1),
      description: 'Admin of Spanish Football Federation',
      location: 'Madrid, Spain',
    },
    {
      id: 2,
      name: 'Maria González',
      email: 'maria.gonzalez@example.com',
      role: 'manager',
      avatar: '',
      phone: '+34 600 234 567',
      status: 'active',
      federation: this.mockFederations[1],
      createdAt: new Date(2023, 6, 15),
      updatedAt: new Date(2024, 2, 15),
      description: 'Manager of Catalan Football Federation',
      location: 'Barcelona, Spain',
    },
    {
      id: 3,
      name: 'Carlos Martínez',
      email: 'carlos.martinez@example.com',
      role: 'editor',
      avatar: '',
      phone: '+34 600 345 678', // Adicionando o campo phone
      status: 'inactive',
      federation: this.mockFederations[2],
      createdAt: new Date(2023, 7, 10),
      updatedAt: new Date(2024, 1, 10),
      description: 'Editor of Andalusian Football Federation',
      location: 'Seville, Spain',
    },
    {
      id: 4,
      name: 'Ana López',
      email: 'ana.lopez@example.com',
      role: 'viewer',
      avatar: '',
      phone: '+34 600 456 789',
      status: 'pending',
      federation: this.mockFederations[3],
      createdAt: new Date(2023, 8, 5),
      updatedAt: new Date(2024, 0, 5),
      description: 'Viewer of Basque Football Federation',
      location: 'Bilbao, Spain',
    },
  ];
}
