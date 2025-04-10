import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  @Input() playerData: any = {};
  @Input() photoPreview: string | null = null;
  @Input() positionLabel: string = '';
  @Input() teamName: string = '';
  @Output() submit = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  confirmationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // Formulário simples apenas para manter consistência com outros componentes
    this.confirmationForm = this.fb.group({});
  }

  onSubmit(): void {
    this.submit.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }
}
