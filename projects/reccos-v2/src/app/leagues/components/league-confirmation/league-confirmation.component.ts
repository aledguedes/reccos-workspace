import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './league-confirmation.component.html',
  styleUrl: './league-confirmation.component.scss',
})
export class LeagueConfirmationComponent {
  @Input() initialData: any = {}; // Dados combinados de todas as etapas
  @Input() selectedTeams: any[] = [];

  @Output() previous = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  isLoading = false;

  constructor(private router: Router) {}

  onPrevious() {
    this.previous.emit();
  }

  onConfirm() {
    this.isLoading = true;

    // Simular tempo de processamento com API
    setTimeout(() => {
      this.confirm.emit();
      this.router.navigate(['/leagues']);
    }, 1500);
  }

  // Formatar data para exibição
  formatDate(dateString: string): string {
    if (!dateString) return 'Não informado';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return dateString;
    }
  }

  getFormatLabel(value: string): string {
    const formats: { [key: string]: string } = {
      league: 'Liga',
      elimination: 'Eliminatórias',
      'group-elimination': 'Grupos + Eliminatórias',
      custom: 'Personalizado',
    };
    return formats[value] || value;
  }

  getSportTypeLabel(value: string): string {
    const sportTypes: { [key: string]: string } = {
      campo: 'Futebol de Campo',
      futsal: 'Futsal',
      society: 'Futebol 7 (Society)',
      areia: 'Futebol de Areia',
      futvolei: 'Futevôlei',
      volei: 'Vôlei',
      basquete: 'Basquete',
    };
    return sportTypes[value] || value || 'Não informado';
  }
}
