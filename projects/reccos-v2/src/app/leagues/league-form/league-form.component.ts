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
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      location: ['', Validators.required],
      status: ['default', Validators.required],
    });

    if (this.league) {
      this.leagueForm.patchValue(this.league);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.leagueForm.valid) {
      this.save.emit(this.leagueForm.value);
      this.leagueForm.reset();
      this.closeModal();
    }
  }

  private closeModal() {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.close();
  }

  onCancel() {
    this.leagueForm.reset();
    this.submitted = false;
    this.cancel.emit();
    this.closeModal();
  }
}
