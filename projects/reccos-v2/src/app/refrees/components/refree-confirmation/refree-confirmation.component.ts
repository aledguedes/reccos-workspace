import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refree-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refree-confirmation.component.html',
  styleUrl: './refree-confirmation.component.scss',
})
export class RefreeConfirmationComponent {
  @Input() refreeData: any = {};
  @Input() photoPreview: string | null = null;
  @Output() submit = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  isLoading = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;

    // Simular tempo de processamento com API
    setTimeout(() => {
      this.submit.emit();
      this.router.navigate(['/refrees']);
    }, 1500);
  }

  onPrevious(): void {
    this.previous.emit();
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

  // Formatar experiência para exibição
  formatExperience(experience: string): string {
    if (!experience) return 'Não informado';

    const experienceMap: { [key: string]: string } = {
      iniciante: 'Iniciante',
      intermediário: 'Intermediário',
      experiente: 'Experiente',
    };

    return experienceMap[experience] || experience;
  }

  // Formatar especialidade para exibição
  formatSpecialty(specialty: string): string {
    if (!specialty) return 'Não informado';

    const specialtyMap: { [key: string]: string } = {
      principal: 'Principal',
      auxiliar: 'Auxiliar',
      ambos: 'Ambos',
    };

    return specialtyMap[specialty] || specialty;
  }

  // Formatar disponibilidade para exibição
  formatAvailability(availability: string): string {
    if (!availability) return 'Não informado';

    const availabilityMap: { [key: string]: string } = {
      disponível: 'Disponível',
      indisponível: 'Indisponível',
    };

    return availabilityMap[availability] || availability;
  }

  // Formatar status para exibição
  formatStatus(status: string): string {
    if (!status) return 'Não informado';

    const statusMap: { [key: string]: string } = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      suspenso: 'Suspenso',
    };

    return statusMap[status] || status;
  }
}
