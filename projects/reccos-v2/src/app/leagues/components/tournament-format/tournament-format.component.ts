import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tournament-format',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tournament-format.component.html',
  styleUrls: ['./tournament-format.component.scss'],
})
export class TournamentFormatComponent implements OnInit, AfterViewInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  parentForm!: FormGroup;
  formatOptions = [
    {
      value: 'league',
      label: 'Liga',
      description:
        'Todos os times jogam entre si, acumulando pontos para uma classificação geral.',
      icon: 'ri-trophy-line',
    },
    {
      value: 'elimination',
      label: 'Eliminatórias',
      description:
        'Torneio no formato mata-mata, onde os times são eliminados ao perder.',
      icon: 'ri-award-line',
    },
    {
      value: 'group-elimination',
      label: 'Grupos + Eliminatórias',
      description:
        'Fase de grupos seguida por eliminatórias entre os classificados.',
      icon: 'ri-team-line',
    },
    {
      value: 'custom',
      label: 'Personalizado',
      description: 'Crie seu próprio formato de competição personalizado.',
      icon: 'ri-flag-line',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.initialData) {
      this.parentForm = this.fb.group({
        format: ['', Validators.required],
        teamsCount: [
          8,
          [Validators.required, Validators.min(2), Validators.max(32)],
        ],
        playersPerTeam: [
          11,
          [Validators.required, Validators.min(1), Validators.max(30)],
        ],
      });

      // Adicionar campo teamsPerGroup apenas quando o formato for group-elimination
      this.parentForm.get('format')?.valueChanges.subscribe(format => {
        if (format === 'group-elimination') {
          this.parentForm.addControl(
            'teamsPerGroup',
            this.fb.control(2, [
              Validators.required,
              Validators.min(2),
              Validators.max(8),
              control => {
                const teamsCount = this.parentForm.get('teamsCount')?.value;
                if (teamsCount && control.value > teamsCount) {
                  return { invalidGroupSize: true };
                }
                return null;
              },
            ])
          );
        } else {
          this.parentForm.removeControl('teamsPerGroup');
        }
      });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    if (this.parentForm.valid) {
      this.next.emit(this.parentForm.value);
    } else {
      this.markFormGroupTouched(this.parentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicializar os sliders com a aparência personalizada
    setTimeout(() => {
      this.updateRangeSliders();

      // Adicionar listeners para os sliders
      const sliders = document.querySelectorAll('input[type="range"]');
      sliders.forEach(slider => {
        slider.addEventListener('input', () => {
          this.updateSliderBackground(slider as HTMLInputElement);
        });

        // Inicializar o background do slider
        this.updateSliderBackground(slider as HTMLInputElement);
      });

      // Observar mudanças nos valores dos controles do formulário
      this.parentForm.get('teamsCount')?.valueChanges.subscribe(() => {
        this.updateRangeSliders();
      });

      this.parentForm.get('playersPerTeam')?.valueChanges.subscribe(() => {
        this.updateRangeSliders();
      });

      this.parentForm.get('teamsPerGroup')?.valueChanges.subscribe(() => {
        this.updateRangeSliders();
      });
    }, 0);
  }

  // Método para atualizar todos os sliders
  private updateRangeSliders(): void {
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
      this.updateSliderBackground(slider as HTMLInputElement);
    });
  }

  // Método para atualizar o background do slider baseado no valor atual
  private updateSliderBackground(slider: HTMLInputElement): void {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const value = parseFloat(slider.value) || 0;

    // Calcular a porcentagem do valor atual em relação ao intervalo
    const percentage = ((value - min) / (max - min)) * 100;

    // Aplicar o estilo de background com a porcentagem calculada
    slider.style.setProperty('--range-shdw', `${percentage}%`);
  }

  validateStep(): boolean {
    // Marcar todos os campos como touched para mostrar validações
    const formatFields = [
      'format',
      'teamsCount',
      'playersPerTeam',
      'matchDuration',
      'breakDuration',
    ];

    // Adicionar campo de times por grupo se o formato for grupos + eliminatórias
    if (this.parentForm.get('format')?.value === 'group-elimination') {
      formatFields.push('teamsPerGroup');
    }

    formatFields.forEach(field => {
      const control = this.parentForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });

    // Verificar se os campos específicos desta etapa são válidos
    let isValid = true;

    formatFields.forEach(field => {
      const control = this.parentForm.get(field);
      if (control?.invalid) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Método para verificar se o formulário está válido para habilitar o botão de próximo
  isFormValid(): boolean {
    const formatFields = [
      'format',
      'teamsCount',
      'playersPerTeam',
      'matchDuration',
      'breakDuration',
    ];

    // Adicionar campo de times por grupo se o formato for grupos + eliminatórias
    if (this.parentForm.get('format')?.value === 'group-elimination') {
      formatFields.push('teamsPerGroup');
    }

    return formatFields.every(field => {
      const control = this.parentForm.get(field);
      return control && control.valid;
    });
  }

  // Retorna o ícone apropriado para cada formato de torneio
  getFormatIcon(format: string): string {
    switch (format) {
      case 'league':
        return 'ri-trophy-line text-primary text-xl';
      case 'elimination':
        return 'ri-award-line text-primary text-xl';
      case 'group-elimination':
        return 'ri-team-line text-primary text-xl';
      case 'custom':
        return 'ri-settings-line text-primary text-xl';
      default:
        return 'ri-trophy-line text-primary text-xl';
    }
  }

  // Retorna a descrição para cada formato de torneio
  getFormatDescription(format: string): string {
    switch (format) {
      case 'league':
        return 'Todos os times jogam entre si, acumulando pontos para uma classificação geral.';
      case 'elimination':
        return 'Torneio no formato mata-mata, onde os times são eliminados ao perder.';
      case 'group-elimination':
        return 'Fase de grupos seguida por eliminatórias entre os classificados.';
      case 'custom':
        return 'Crie seu próprio formato de competição personalizado.';
      default:
        return '';
    }
  }
}
