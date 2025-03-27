import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TournamentFormatComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Output() proceed = new EventEmitter<void>();

  formatOptions = [
    { value: 'league', label: 'Liga (todos contra todos)' },
    { value: 'cup', label: 'Copa (eliminatórias)' },
    { value: 'group_knockout', label: 'Grupos + Eliminatórias' },
    { value: 'custom', label: 'Personalizado' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Verificar se o formulário pai foi injetado corretamente
    if (!this.parentForm) {
      console.error('O formulário pai não foi injetado corretamente!');
      return;
    }

    // Verificar se os campos necessários existem no formulário pai
    if (!this.parentForm.get('format')) {
      this.parentForm.addControl(
        'format',
        this.fb.control('league', Validators.required)
      );
    }

    if (!this.parentForm.get('teamsCount')) {
      this.parentForm.addControl(
        'teamsCount',
        this.fb.control(8, [Validators.required, Validators.min(2)])
      );
    }

    if (!this.parentForm.get('playersPerTeam')) {
      this.parentForm.addControl(
        'playersPerTeam',
        this.fb.control(5, [Validators.required, Validators.min(1)])
      );
    }

    if (!this.parentForm.get('matchDuration')) {
      this.parentForm.addControl(
        'matchDuration',
        this.fb.control(40, [Validators.required, Validators.min(10)])
      );
    }

    // Adicionar campo de intervalo se não existir
    if (!this.parentForm.get('breakDuration')) {
      this.parentForm.addControl(
        'breakDuration',
        this.fb.control(15, [Validators.required, Validators.min(5)])
      );
    }

    // Adicionar campo de times por grupo se não existir
    if (!this.parentForm.get('teamsPerGroup')) {
      this.parentForm.addControl(
        'teamsPerGroup',
        this.fb.control(4, [Validators.required, Validators.min(2)])
      );
    }

    // Observar mudanças no formato para mostrar/ocultar campos específicos
    this.parentForm.get('format')?.valueChanges.subscribe(format => {
      const teamsPerGroupControl = this.parentForm.get('teamsPerGroup');

      if (format === 'group_knockout') {
        // Ativar validação para o campo de times por grupo
        if (teamsPerGroupControl) {
          teamsPerGroupControl.setValidators([
            Validators.required,
            Validators.min(2),
          ]);
        }
      } else {
        // Remover validação quando não for formato de grupos
        if (teamsPerGroupControl) {
          teamsPerGroupControl.clearValidators();
          teamsPerGroupControl.updateValueAndValidity();
        }
      }
    });

    // Trigger inicial para configurar validações baseadas no formato atual
    const currentFormat = this.parentForm.get('format')?.value;
    if (currentFormat === 'group_knockout') {
      const teamsPerGroupControl = this.parentForm.get('teamsPerGroup');
      if (teamsPerGroupControl) {
        teamsPerGroupControl.setValidators([
          Validators.required,
          Validators.min(2),
        ]);
        teamsPerGroupControl.updateValueAndValidity();
      }
    }
  }

  onNext(): void {
    if (this.validateStep()) {
      this.proceed.emit();
    }
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
    if (this.parentForm.get('format')?.value === 'group_knockout') {
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
    if (this.parentForm.get('format')?.value === 'group_knockout') {
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
      case 'cup':
        return 'ri-award-line text-primary text-xl';
      case 'group_knockout':
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
      case 'cup':
        return 'Torneio no formato mata-mata, onde os times são eliminados ao perder.';
      case 'group_knockout':
        return 'Fase de grupos seguida por eliminatórias entre os classificados.';
      case 'custom':
        return 'Crie seu próprio formato de competição personalizado.';
      default:
        return '';
    }
  }
}
