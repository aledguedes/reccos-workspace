import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class LeagueFormComponent implements OnInit, OnChanges {
  @Input() league: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  leagueForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    // Inicializar o formulário com os dados da liga quando estiver no modo de edição
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['league'] && changes['league'].currentValue) {
      this.initForm();
    }
  }

  initForm() {
    this.leagueForm = this.fb.group({
      name: [
        this.league?.name || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [this.league?.description || '', Validators.maxLength(500)],
      location: [this.league?.location || '', Validators.required],
      status: [this.league?.status || 'active', Validators.required],
    });
  }

  onSubmit() {
    if (this.leagueForm.invalid) {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.leagueForm.controls).forEach(key => {
        const control = this.leagueForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitted = true;
    this.save.emit(this.leagueForm.value);
    this.closeModal();
  }

  private closeModal() {
    const modal = document.getElementById(
      'my_modal_teams'
    ) as HTMLDialogElement;
    modal?.close();
  }

  onCancel() {
    this.leagueForm.reset();
    this.submitted = false;
    this.cancel.emit();
    this.closeModal();
  }
}
