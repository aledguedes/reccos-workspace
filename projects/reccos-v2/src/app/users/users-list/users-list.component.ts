import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { IFederation, IUser } from '../../core/models/user.models';
import { SimpleGridComponent } from '../../shared/components/simple-grid/simple-grid.component';
import { CardViewComponent } from '../../shared/components/card-view/card-view.component';
import { ToastService } from '../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EntityTypeMap,
  federations,
  IEntity,
  LayoutOption,
  leagues,
  players,
  refrees,
  teams,
  users,
} from '../../core/models/mocks.models';
import { TitleCasePipe } from '@angular/common';

type ViewLayout = 'grid' | 'simple' | 'table';

export interface ILayout {
  value: ViewLayout;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-users-list',
  imports: [SimpleGridComponent, CardViewComponent, TitleCasePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  mappedUsers: IUser[] = [];

  flag!: keyof EntityTypeMap;
  items = signal<IEntity[]>([]);
  filteredItems = signal<IEntity[]>([]);
  flagTranslation: string = '';

  // Add this with your other signals
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);
  currentLayout = signal<ViewLayout>('grid');

  layouts: LayoutOption[] = [
    { value: 'grid', label: 'Grid', icon: 'ri-grid-line' },
    { value: 'simple', label: 'Simples', icon: 'ri-layout-line' },
    { value: 'table', label: 'Tabela', icon: 'ri-table-line' },
  ];

  private flagTranslations: { [key in keyof EntityTypeMap]: string } = {
    users: 'Usuário',
    teams: 'Time',
    leagues: 'Liga',
    players: 'Jogador',
    refrees: 'Árbitro',
    federations: 'Federação',
  };

  constructor(
    private route: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Usar o ActivatedRoute para obter o primeiro segmento da URL
    this.activatedRoute.url.subscribe(segments => {
      const segment = segments.length > 0 ? segments[0].path : 'users'; // Default para 'users' se não houver segmento

      // Define o flag diretamente como o segmento da URL
      this.flag = segment as keyof EntityTypeMap;

      // Verifica se o flag é válido, caso contrário usa 'users' como fallback
      const validFlags = [
        'users',
        'teams',
        'leagues',
        'players',
        'refrees',
        'federations',
      ];
      if (!validFlags.includes(this.flag)) {
        console.warn('Flag inválido:', this.flag, 'Usando default "leagues"');
        this.flag = 'leagues';
      }

      this.flagTranslation =
        this.flagTranslations[this.flag].toLocaleLowerCase();
      console.log(this.flagTranslation);
      this.loadItems();
    });

    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500); // 1.5 second fake loading time
  }

  private loadItems(): void {
    this.isLoading.set(true);
    const dataMap: { [key in keyof EntityTypeMap]: IEntity[] } = {
      users: users,
      teams: teams,
      leagues: leagues,
      players: players,
      refrees: refrees,
      federations: federations,
    };
    const items = dataMap[this.flag] || [];
    this.items.set(items);
    this.filteredItems.set(items);
    this.isLoading.set(false);
  }

  getTranslatedFlag(): string {
    return this.flagTranslations[this.flag];
  }

  onSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
    this.filterItems(query);
  }

  private filterItems(query: string): void {
    if (!query) {
      this.filteredItems.set(this.items());
    } else {
      this.filteredItems.set(
        this.items().filter(item =>
          this.searchInItem(item, query.toLowerCase())
        )
      );
    }
  }

  private searchInItem(item: IEntity, query: string): boolean {
    return JSON.stringify(item).toLowerCase().includes(query);
  }

  setLayout(layout: 'grid' | 'simple' | 'table'): void {
    this.currentLayout.set(layout);
  }

  navigateToNew(): void {
    this.route.navigate([`/${this.flag}/new`]);
  }
}
