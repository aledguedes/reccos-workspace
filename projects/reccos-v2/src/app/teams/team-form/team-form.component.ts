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
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITeam } from '../../core/models/team.model';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss',
})
export class TeamFormComponent implements OnInit, OnChanges {
  @Input() team: ITeam | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  teamForm!: FormGroup;
  logoPreview: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team'] && changes['team'].currentValue) {
      this.initForm();
    }
  }

  initForm(): void {
    this.teamForm = this.fb.group({
      name: [
        this.team?.name || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [this.team?.description || '', Validators.maxLength(500)],
      city: [this.team?.city || '', Validators.maxLength(100)],
      state: [this.team?.state || '', Validators.maxLength(100)],
      stadium: [this.team?.stadium || '', Validators.maxLength(100)],
      leagueName: [this.team?.leagueName || ''],
      status: [this.team?.status || 'active'],
      coach: [this.team?.coach || ''],
      website: [
        this.team?.website || '',
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
      foundedYear: [
        this.team?.foundedYear || null,
        [Validators.min(1800), Validators.max(new Date().getFullYear())],
      ],
      logo: [''],
      playersCount: [
        this.team?.playersCount || 0,
        [Validators.min(0), Validators.max(100)],
      ],
    });

    if (this.team?.logo) {
      this.logoPreview = this.team.logo;
    }
  }

  onLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Aqui você poderia implementar o upload da imagem para um servidor
      // e atualizar o valor do campo logo com a URL retornada
    }
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      Object.keys(this.teamForm.controls).forEach(key => {
        const control = this.teamForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const formData = {
      ...this.teamForm.value,
      logo: this.logoPreview || this.team?.logo,
    };

    this.save.emit(formData);
    this.isSubmitting = false;
    this.closeModal();
  }

  onCancel(): void {
    this.teamForm.reset();
    this.isSubmitting = false;
    this.cancel.emit();
    this.closeModal();
  }

  private closeModal(): void {
    const modal = document.getElementById(
      'my_modal_teams'
    ) as HTMLDialogElement;
    modal?.close();
  }

  // Helpers para validação de formulário
  hasError(controlName: string, errorName: string): boolean {
    const control = this.teamForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  getErrorMessage(controlName: string): string {
    const control = this.teamForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Este campo é obrigatório';
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control.hasError('pattern')) return 'Formato inválido';
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
}
