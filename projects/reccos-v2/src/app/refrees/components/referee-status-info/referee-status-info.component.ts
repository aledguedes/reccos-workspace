import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-referee-status-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referee-status-info.component.html',
  styleUrl: './referee-status-info.component.scss',
})
export class RefereeStatusInfoComponent implements OnInit {
  @Input() initialData: any = {};
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  statusForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.statusForm = this.fb.group({
      availability: [this.initialData?.availability || '', Validators.required],
      status: [this.initialData?.status || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      this.next.emit(this.statusForm.value);
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.statusForm.get(controlName);
    return (control?.touched && control?.hasError(errorName)) || false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.statusForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    return '';
  }
}
