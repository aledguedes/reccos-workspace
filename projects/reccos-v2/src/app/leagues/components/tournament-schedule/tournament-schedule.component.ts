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
    const registrationPeriod = this.initialData.registrationPeriod || {
      start: null,
      end: null,
    };

    const transferWindow = this.initialData.transferWindow || {
      start: null,
      end: null,
    };

    this.scheduleForm = this.fb.group({
      sportType: [this.initialData.sportType || '', Validators.required],

      registrationStart: [registrationPeriod.start, Validators.required],
      registrationEnd: [registrationPeriod.end, Validators.required],

      transferWindowStart: [transferWindow.start],
      transferWindowEnd: [transferWindow.end],

      playerRegistrationDeadline: [
        this.initialData.playerRegistrationDeadline || null,
        Validators.required,
      ],

      preferredDays: [this.initialData.preferredDays || []],
      startTime: [this.initialData.preferredTimes?.[0] || '08:00'],
      endTime: [
        this.initialData.preferredTimes?.[
          this.initialData.preferredTimes?.length - 1
        ] || '20:00',
      ],

      matchInterval: [
        this.initialData.matchInterval || 90,
        [Validators.required, Validators.min(30)],
      ],
    });
  }

  toggleDay(day: string): void {
    const control = this.scheduleForm.get('preferredDays');
    if (!control) return;

    const selected = [...control.value];
    const index = selected.indexOf(day);

    index >= 0 ? selected.splice(index, 1) : selected.push(day);
    control.setValue(selected);
  }

  isDaySelected(day: string): boolean {
    return this.scheduleForm.get('preferredDays')?.value?.includes(day);
  }

  toggleTime(time: string): void {
    const control = this.scheduleForm.get('preferredTimes');
    if (!control) return;

    const selected = [...control.value];
    const index = selected.indexOf(time);

    index >= 0 ? selected.splice(index, 1) : selected.push(time);
    control.setValue(selected);
  }

  isTimeSelected(time: string): boolean {
    return this.scheduleForm.get('preferredTimes')?.value?.includes(time);
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      const {
        sportType,
        registrationStart,
        registrationEnd,
        transferWindowStart,
        transferWindowEnd,
        playerRegistrationDeadline,
        preferredDays,
        startTime,
        endTime,
        matchInterval,
      } = this.scheduleForm.value;

      // Criar array de horários preferidos com base no intervalo selecionado
      const preferredTimes = this.generateTimeRange(startTime, endTime);

      const updatedData: TournamentData = {
        ...this.initialData,
        sportType,
        registrationPeriod: {
          start: registrationStart,
          end: registrationEnd,
        },
        transferWindow: {
          start: transferWindowStart,
          end: transferWindowEnd,
        },
        playerRegistrationDeadline,
        preferredDays,
        preferredTimes,
        startTime,
        endTime,
        matchInterval,
      };

      this.next.emit(updatedData);
    } else {
      this.scheduleForm.markAllAsTouched();
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  generateAutomaticSchedule(): void {
    console.log('Gerando agenda automática com dados parciais:');
    console.table(this.scheduleForm.value);
  }

  generateTimeRange(startTime: string, endTime: string): string[] {
    if (!startTime || !endTime) return [];

    const timeValues = this.times.map(t => t.value);
    const startIndex = timeValues.indexOf(startTime);
    const endIndex = timeValues.indexOf(endTime);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      return [startTime, endTime];
    }

    return timeValues.slice(startIndex, endIndex + 1);
  }
}
