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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['league'] && changes['league'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit() {
    this.initForm();
    // Inicializar o formulário com os dados da liga quando estiver no modo de edição
  }

  initForm() {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      location: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (this.league) {
      console.log('ON INIT FORM', this.league);

      // Garantir que temos valores válidos para cada campo
      const name = this.league.name || '';
      const description = this.league.description || '';
      const location = this.league.location || '';

      // Mapear o status da liga para os valores do formulário
      let formStatus = 'active'; // Valor padrão válido caso não corresponda a nenhum dos casos
      if (this.league.status) {
        switch (this.league.status) {
          case 'active':
            formStatus = 'active';
            break;
          case 'finished':
            formStatus = 'archived';
            break;
          case 'upcoming':
            formStatus = 'ongoing';
            break;
          // Não definimos default para 'default' pois esse valor não existe nas opções do select
        }
      }

      // Atualizar o formulário com os valores da liga
      this.leagueForm.patchValue({
        name: name,
        description: description,
        location: location,
        status: formStatus,
      });

      console.log('ON INIT FORM this.leagueForm', this.leagueForm.value);
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
