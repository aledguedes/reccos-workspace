import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  // Variável para controlar a exibição da sidebar em dispositivos móveis
  isSidebarOpen = false; // Inicializa fechada para dispositivos móveis
  // Variável para controlar o estado de expansão da sidebar
  isSidebarExpanded = true;

  // Links da sidebar organizados por categorias
  sidebarLinks = [
    // Categoria: Competições
    { name: 'Competições', isHeader: true },
    {
      name: 'Ligas',
      path: '/leagues',
      icon: 'trophy',
      description: 'Gerenciar ligas e campeonatos',
    },
    {
      name: 'Federações',
      path: '/federations',
      icon: 'organization-chart',
      description: 'Administrar federações esportivas',
    },
    {
      name: 'Torneios',
      path: '/tournaments',
      icon: 'medal',
      description: 'Gerenciar torneios e copas',
    },

    // Categoria: Equipes
    { name: 'Equipes', isHeader: true },
    {
      name: 'Times',
      path: '/teams',
      icon: 'team',
      description: 'Gerenciar times e elencos',
    },
    {
      name: 'Jogadores',
      path: '/players',
      icon: 'user-3',
      description: 'Cadastro e gestão de atletas',
    },

    // Categoria: Operacional
    { name: 'Operacional', isHeader: true },
    {
      name: 'Árbitros',
      path: '/referees',
      icon: 'user-star',
      description: 'Gestão de árbitros',
    },
    {
      name: 'Estatísticas',
      path: '/statistics',
      icon: 'line-chart',
      description: 'Visualizar estatísticas',
    },
    {
      name: 'Calendário',
      path: '/calendar',
      icon: 'calendar-2',
      description: 'Agenda de jogos e eventos',
    },
  ];

  // Links contextuais da navbar - serão atualizados com base no componente atual
  navbarLinks: { name: string; path: string }[] = [];

  // Título da página atual
  currentPageTitle = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only access window object in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Detectar a rota atual e atualizar os links contextuais e o título
      this.updateContextualLinks(window.location.pathname);
    }
  }

  // Método para atualizar os links contextuais com base na rota atual
  updateContextualLinks(path: string): void {
    if (path.includes('leagues')) {
      this.currentPageTitle = 'Gerenciamento de Ligas';
      this.navbarLinks = [
        { name: 'Times', path: '/leagues/teams' },
        { name: 'Jogadores', path: '/leagues/players' },
        { name: 'Partidas', path: '/leagues/matches' },
      ];
    } else if (path.includes('federations')) {
      this.currentPageTitle = 'Gerenciamento de Federações';
      this.navbarLinks = [
        { name: 'Ligas', path: '/federations/leagues' },
        { name: 'Membros', path: '/federations/members' },
      ];
    } else if (path.includes('teams')) {
      this.currentPageTitle = 'Gerenciamento de Times';
      this.navbarLinks = [
        { name: 'Jogadores', path: '/teams/players' },
        { name: 'Estatísticas', path: '/teams/statistics' },
      ];
    } else if (path.includes('players')) {
      this.currentPageTitle = 'Gerenciamento de Jogadores';
      this.navbarLinks = [
        { name: 'Perfil', path: '/players/profile' },
        { name: 'Estatísticas', path: '/players/statistics' },
      ];
    }
    // Adicionar mais condições para futuros componentes
  }

  // Método para alternar a visibilidade da sidebar em dispositivos móveis
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Método para alternar o estado de expansão da sidebar
  toggleSidebarExpansion(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
