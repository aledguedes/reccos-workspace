import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-team-coach-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-coach-info.component.html',
  styleUrl: './team-coach-info.component.scss',
})
export class TeamCoachInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  coachForm!: FormGroup;
  playersFile: File | null = null;
  playersList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.coachForm = this.fb.group({
      coachName: [
        this.initialData?.coachName || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      coachPhone: [
        this.initialData?.coachPhone || '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/),
        ],
      ],
      coachEmail: [this.initialData?.coachEmail || '', [Validators.email]],
    });

    // Recuperar lista de jogadores se existir
    if (this.initialData?.playersList) {
      this.playersList = this.initialData.playersList;
    }
  }

  onPlayersFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Verificar se é um arquivo válido (CSV ou Excel)
      const validTypes = [
        '.csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (
        !validTypes.some(
          type => file.type.includes(type) || file.name.endsWith(type)
        )
      ) {
        alert('Por favor, selecione um arquivo CSV ou Excel válido.');
        return;
      }

      this.playersFile = file;

      // Em um cenário real, aqui você processaria o arquivo para extrair os dados dos jogadores
      // Por simplicidade, vamos apenas simular que temos uma lista de jogadores
      this.playersList = [
        { id: 1, name: 'Jogador Importado 1' },
        { id: 2, name: 'Jogador Importado 2' },
        { id: 3, name: 'Jogador Importado 3' },
      ];
    }
  }

  onNext(): void {
    if (this.coachForm.valid) {
      const formData = {
        ...this.coachForm.value,
        playersList: this.playersList,
      };
      this.next.emit(formData);
    } else {
      this.markFormGroupTouched(this.coachForm);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.coachForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.coachForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      if (controlName === 'coachPhone') {
        return 'Formato de telefone inválido. Use (00) 00000-0000 ou apenas números';
      }
      return 'Formato inválido';
    }
    if (control.hasError('email')) return 'Email inválido';

    return 'Campo inválido';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
