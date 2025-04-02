import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamFormComponent } from '../team-form/team-form.component';
import { ITeam } from '../../core/models/team.model';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-team-form-page',
  standalone: true,
  imports: [CommonModule, TeamFormComponent],
  templateUrl: './team-form-page.component.html',
  styleUrl: './team-form-page.component.scss',
})
export class TeamFormPageComponent implements OnInit {
  selectedTeam: ITeam | null = null;
  teamId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Verificar se estamos no modo de edição (se há um ID na rota)
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.teamId = +idParam;
        // Aqui você buscaria os dados do time no backend
        // Por enquanto, vamos simular com dados mock
        this.loadTeamData(this.teamId);
      }
    });
  }

  // Método para carregar dados do time (simulado)
  loadTeamData(id: number): void {
    // Em um cenário real, você faria uma chamada ao serviço
    // Simulando dados para demonstração
    const mockTeams: ITeam[] = [
      {
        id: 1,
        name: 'Manchester United',
        city: 'Manchester',
        state: 'Inglaterra',
        stadium: 'Old Trafford',
        logo: 'assets/team-logos/manchester-united.png',
        status: 'active',
        description: 'Clube de futebol inglês fundado em 1878.',
        coach: 'Erik ten Hag',
        website: 'https://www.manutd.com',
        foundedYear: 1878,
        playersCount: 25,
        leagueName: 'Premier League',
      },
      // Outros times...
    ];

    this.selectedTeam = mockTeams.find(team => team.id === id) || null;

    if (!this.selectedTeam) {
      this.toastService.error('Time não encontrado');
      this.router.navigate(['/teams']);
    }
  }

  onSaveTeam(teamData: any): void {
    console.log('Team saved:', teamData);
    // Aqui você implementaria a lógica para salvar o time no backend

    try {
      // Exibir mensagem de sucesso
      this.toastService.success(
        `Time "${teamData.name}" ${this.teamId ? 'atualizado' : 'criado'} com sucesso!`
      );

      // Navegar de volta para a lista de times
      this.router.navigate(['/teams']);
    } catch (error) {
      // Exibir mensagem de erro caso ocorra algum problema
      console.error('Erro ao salvar time:', error);
      this.toastService.error(
        `Erro ao salvar time: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }

  onCancelTeam(): void {
    // Navegar de volta para a lista de times
    this.router.navigate(['/teams']);
  }
}
