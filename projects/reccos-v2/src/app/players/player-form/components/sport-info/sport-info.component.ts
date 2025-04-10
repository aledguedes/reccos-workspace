import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PLAYER_POSITIONS } from '../../../../core/models/player.model';
import { ITeam } from '../../../../core/models/team.model';

@Component({
  selector: 'app-sport-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sport-info.component.html',
  styleUrl: './sport-info.component.scss',
})
export class SportInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Input() teams: ITeam[] = [];
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  sportForm!: FormGroup;
  positions = PLAYER_POSITIONS;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.sportForm = this.fb.group({
      position: [this.initialData?.position || '', Validators.required],
      teamId: [this.initialData?.teamId || null, Validators.required],
      teamName: [this.initialData?.teamName || ''],
      jerseyNumber: [
        this.initialData?.jerseyNumber || null,
        [Validators.min(1), Validators.max(99)],
      ],
      height: [
        this.initialData?.height || null,
        [Validators.min(100), Validators.max(250)],
      ],
      weight: [
        this.initialData?.weight || null,
        [Validators.min(30), Validators.max(150)],
      ],
    });

    // Atualizar o nome do time quando o ID do time mudar
    this.sportForm.get('teamId')?.valueChanges.subscribe(teamId => {
      const selectedTeam = this.teams.find(t => t.id === teamId);
      if (selectedTeam) {
        this.sportForm.get('teamName')?.setValue(selectedTeam.name);
      }
    });
  }

  onNext(): void {
    if (this.sportForm.valid) {
      this.next.emit(this.sportForm.value);
    } else {
      this.markFormGroupTouched(this.sportForm);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.sportForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.sportForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('min')) {
      const min = control.getError('min').min;
      return `Valor mínimo: ${min}`;
    }
    if (control.hasError('max')) {
      const max = control.getError('max').max;
      return `Valor máximo: ${max}`;
    }

    return 'Campo inválido';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
