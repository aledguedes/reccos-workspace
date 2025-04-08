import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import {
  EntityTypeMap,
  federations,
  IEntity,
  LayoutOption,
  leagues,
  players,
  referees,
  teams,
  users,
} from '../../../core/models/mocks.models';
import { SimpleGridComponent } from '../simple-grid/simple-grid.component';
import { CardViewComponent } from '../card-view/card-view.component';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

type ViewLayout = 'grid' | 'simple' | 'table';

@Component({
  selector: 'app-list-default',
  imports: [SimpleGridComponent, CardViewComponent, TitleCasePipe],
  templateUrl: './list-default.component.html',
  styleUrl: './list-default.component.scss',
})
export class ListDefaultComponent {
  @Output() search = new EventEmitter<string>();

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
    referees: 'Árbitro',
    federations: 'Federação',
  };
  private routeSubscription!: Subscription;

  constructor(
    private route: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Usar o ActivatedRoute para obter o primeiro segmento da URL
    const updateFlagFromUrl = () => {
      // Extrai o segmento raiz da URL completa (ex.: 'users' de '/users/list-all')
      const urlSegments = this.route.url.split('/');
      const segment = urlSegments[1] || 'users'; // Pega 'users', 'leagues', etc.

      const newFlag = segment as keyof EntityTypeMap;

      const validFlags = [
        'users',
        'teams',
        'leagues',
        'players',
        'referees',
        'federations',
      ];

      if (!validFlags.includes(newFlag)) {
        console.warn('Flag inválido:', newFlag, 'Usando default "users"');
        this.flag = 'users';
      } else {
        this.flag = newFlag;
        console.log('Flag atualizado:', this.flag);
      }

      this.flagTranslation =
        this.flagTranslations[this.flag].toLocaleLowerCase();
      this.loadItems();

      this.isLoading.set(true);
      setTimeout(() => {
        this.isLoading.set(false);
      }, 1500);
    };

    // Chama inicialmente
    updateFlagFromUrl();

    // Observa mudanças na URL usando Router.events
    this.routeSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlSegments = this.route.url.split('/');
        const segment = urlSegments[1] || 'users';
        const newFlag = segment as keyof EntityTypeMap;

        const validFlags = [
          'users',
          'teams',
          'leagues',
          'players',
          'referees',
          'federations',
        ];

        if (!validFlags.includes(newFlag)) {
          console.warn('Flag inválido:', newFlag, 'Usando default "users"');
          this.flag = 'users';
        } else if (this.flag !== newFlag) {
          // Só atualiza se o flag mudou
          this.flag = newFlag;
          console.log('Flag atualizado:', this.flag);
          this.flagTranslation =
            this.flagTranslations[this.flag].toLocaleLowerCase();
          this.loadItems();

          this.isLoading.set(true);
          setTimeout(() => {
            this.isLoading.set(false);
          }, 1500);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadItems(): void {
    this.isLoading.set(true);
    const dataMap: { [key in keyof EntityTypeMap]: IEntity[] } = {
      users: users,
      teams: teams,
      leagues: leagues,
      players: players,
      referees: referees,
      federations: federations,
    };
    const items = dataMap[this.flag] || [];
    console.log(this.flag);
    // console.log(items);
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
