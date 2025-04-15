import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface TournamentData {
  format: 'league' | 'elimination' | 'group-elimination' | 'custom';
  sportType?: string;
  registrationPeriod?: { start: Date; end: Date };
  transferWindow?: { start: Date; end: Date };
  playerRegistrationDeadline?: Date;
  preferredDays?: string[];
  preferredTimes?: string[];
  venues?: string[];
  matchInterval?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-tournament-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tournament-schedule.component.html',
  styleUrls: ['./tournament-schedule.component.scss'],
})
export class TournamentScheduleComponent implements OnInit {
  @Input() initialData: TournamentData = { format: 'league' };
  @Output() next = new EventEmitter<TournamentData>();
  @Output() previous = new EventEmitter<void>();

  scheduleForm!: FormGroup;
  formatTypes: Record<string, string> = {
    league: 'Todos contra todos',
    elimination: 'Eliminatórias',
    'group-elimination': 'Grupos + Eliminatórias',
    custom: 'Personalizado',
  };

  sportTypes = [
    { value: 'campo', label: 'Futebol de Campo' },
    { value: 'futsal', label: 'Futsal' },
    { value: 'society', label: 'Futebol 7 (Society)' },
    { value: 'areia', label: 'Futebol de Areia' },
    { value: 'futvolei', label: 'Futevôlei' },
    { value: 'volei', label: 'Vôlei' },
    { value: 'basquete', label: 'Basquete' },
  ];

  days = [
    { value: 'dom', label: 'Dom' },
    { value: 'seg', label: 'Seg' },
    { value: 'ter', label: 'Ter' },
    { value: 'qua', label: 'Qua' },
    { value: 'qui', label: 'Qui' },
    { value: 'sex', label: 'Sex' },
    { value: 'sab', label: 'Sáb' },
  ];

  times = [
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '14:00', label: '14:00' },
    { value: '16:00', label: '16:00' },
    { value: '18:00', label: '18:00' },
    { value: '19:00', label: '19:00' },
    { value: '20:00', label: '20:00' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // Obter valores iniciais ou definir valores padrão
    const registrationPeriod = this.initialData.registrationPeriod || {
      start: null,
      end: null,
    };
    const transferWindow = this.initialData.transferWindow || {
      start: null,
      end: null,
    };

    this.scheduleForm = this.fb.group({
      // Tipo de esporte
      sportType: [this.initialData.sportType || '', Validators.required],

      // Períodos importantes
      registrationStart: [registrationPeriod.start, Validators.required],
      registrationEnd: [registrationPeriod.end, Validators.required],
      transferWindowStart: [transferWindow.start],
      transferWindowEnd: [transferWindow.end],
      playerRegistrationDeadline: [
        this.initialData.playerRegistrationDeadline || null,
        Validators.required,
      ],

      // Preferências de agendamento
      preferredDays: [this.initialData.preferredDays || []],
      preferredTimes: [this.initialData.preferredTimes || []],
      venues: [this.initialData.venues || ''],
      matchInterval: [
        this.initialData.matchInterval || 90,
        [Validators.required, Validators.min(30)],
      ],
    });
  }

  toggleDay(day: string): void {
    const preferredDays = [
      ...(this.scheduleForm.get('preferredDays')?.value || []),
    ];
    const index = preferredDays.indexOf(day);

    if (index === -1) {
      preferredDays.push(day);
    } else {
      preferredDays.splice(index, 1);
    }

    this.scheduleForm.get('preferredDays')?.setValue(preferredDays);
  }

  isDaySelected(day: string): boolean {
    const preferredDays = this.scheduleForm.get('preferredDays')?.value || [];
    return preferredDays.includes(day);
  }

  toggleTime(time: string): void {
    const preferredTimes = [
      ...(this.scheduleForm.get('preferredTimes')?.value || []),
    ];
    const index = preferredTimes.indexOf(time);

    if (index === -1) {
      preferredTimes.push(time);
    } else {
      preferredTimes.splice(index, 1);
    }

    this.scheduleForm.get('preferredTimes')?.setValue(preferredTimes);
  }

  isTimeSelected(time: string): boolean {
    const preferredTimes = this.scheduleForm.get('preferredTimes')?.value || [];
    return preferredTimes.includes(time);
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      // Formatar os dados antes de emitir o evento
      const formValue = this.scheduleForm.value;

      const formattedData = {
        ...this.initialData,
        sportType: formValue.sportType,
        registrationPeriod: {
          start: formValue.registrationStart,
          end: formValue.registrationEnd,
        },
        transferWindow: {
          start: formValue.transferWindowStart,
          end: formValue.transferWindowEnd,
        },
        playerRegistrationDeadline: formValue.playerRegistrationDeadline,
        preferredDays: formValue.preferredDays,
        preferredTimes: formValue.preferredTimes,
        venues: formValue.venues,
        matchInterval: formValue.matchInterval,
      };

      this.next.emit(formattedData);
    } else {
      this.scheduleForm.markAllAsTouched();
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  generateAutomaticSchedule(): void {
    // Implementar lógica para gerar agenda automática
    console.log('Gerando agenda automática...');
    // Aqui você implementaria a lógica para gerar datas e horários
    // baseado no formato do torneio e número de times
  }
}
