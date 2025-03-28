import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-league-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './league-form.component.html',
  styleUrl: './league-form.component.scss',
})
export class LeagueFormComponent {
  @Input() league: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  leagueForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(500)],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    if (this.league) {
      this.leagueForm.patchValue(this.league);
    }
  }

  onSubmit() {
    if (this.leagueForm.valid) {
      this.save.emit(this.leagueForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
