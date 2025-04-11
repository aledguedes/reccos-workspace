import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-confirmation.component.html',
  styleUrl: './team-confirmation.component.scss',
})
export class TeamConfirmationComponent implements OnInit {
  @Input() teamData: any = {};
  @Input() logoPreview: string | null = null;
  @Output() submit = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  isSubmitting = false;
  statusLabel = '';

  constructor() {}

  ngOnInit(): void {
    this.setStatusLabel();
  }

  setStatusLabel(): void {
    const statusMap: Record<string, string> = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      inativo: 'Inativo',
    };

    this.statusLabel =
      statusMap[this.teamData.status] || this.teamData.status || 'Pendente';
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.submit.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }
}
