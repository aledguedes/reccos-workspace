import { SidebarComponent } from './../sidebar/sidebar.components';
import { HeaderComponent } from './../../header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
  ],
  template: `
    <div class="flex h-screen bg-gray-100">
      sidebar
      <app-sidebar></app-sidebar>

      <div class="flex-1 flex flex-col overflow-auto">
        <app-header></app-header>
        <router-outlet />
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent {}
