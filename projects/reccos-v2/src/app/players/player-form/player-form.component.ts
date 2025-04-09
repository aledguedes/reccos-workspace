import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPlayer, PLAYER_POSITIONS } from '../../core/models/player.model';
import { ITeam } from '../../core/models/team.model';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
})
export class PlayerFormComponent implements OnInit {
  @Input() player: IPlayer | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  playerForm!: FormGroup;
  photoPreview: string | null = null;
  isSubmitting = false;
  currentStep = 1;
  totalSteps = 5;
  positions = PLAYER_POSITIONS;
  teams: ITeam[] = [];
  addressLoading = false;
  cepError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTeams();
  }

  loadTeams(): void {
    // Simulação de times - em produção, estes viriam de uma API
    this.teams = [
      { id: 1, name: 'Flamengo', status: 'active' },
      { id: 2, name: 'Vasco', status: 'active' },
      { id: 3, name: 'Fluminense', status: 'active' },
      { id: 4, name: 'Botafogo', status: 'active' },
      { id: 5, name: 'São Paulo', status: 'active' },
      { id: 6, name: 'Palmeiras', status: 'active' },
      { id: 7, name: 'Santos', status: 'active' },
      { id: 8, name: 'Corinthians', status: 'active' },
    ];
  }

  searchCep(): void {
    const cep = this.playerForm.get('contactInfo')?.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.addressLoading = true;
      this.cepError = false;

      // Chamada para a API ViaCEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.playerForm.get('contactInfo')?.patchValue({
              address: data.logradouro,
              city: data.localidade,
              state: data.uf,
            });
          } else {
            this.cepError = true;
          }
          this.addressLoading = false;
        })
        .catch(() => {
          this.cepError = true;
          this.addressLoading = false;
        });
    }
  }

  openCepSearch(): void {
    window.open(
      'https://buscacepinter.correios.com.br/app/endereco/index.php',
      '_blank'
    );
  }

  initForm(): void {
    this.playerForm = this.fb.group({
      // Etapa 1: Dados básicos de identificação
      personalInfo: this.fb.group({
        name: [
          this.player?.name || '',
          [Validators.required, Validators.maxLength(100)],
        ],
        birthDate: [this.player?.birthDate || '', Validators.required],
        document: [
          this.player?.document || '',
          [Validators.required, Validators.maxLength(20)],
        ],
        photo: [''],
      }),

      // Etapa 2: Dados de contato
      contactInfo: this.fb.group({
        cep: ['', [Validators.pattern(/^[0-9]{8}$/)]],
        phone: [
          this.player?.phone || '',
          [Validators.required, Validators.pattern(/^\d{10,11}$/)],
        ],
        email: [
          this.player?.email || '',
          [Validators.email, Validators.maxLength(100)],
        ],
        address: [this.player?.address || '', Validators.maxLength(200)],
        city: [this.player?.city || '', Validators.maxLength(100)],
        state: [this.player?.state || '', Validators.maxLength(50)],
      }),

      // Etapa 3: Dados relacionados ao esporte
      sportInfo: this.fb.group({
        position: [this.player?.position || '', Validators.required],
        teamId: [this.player?.teamId || null],
        teamName: [this.player?.teamName || ''],
        jerseyNumber: [
          this.player?.jerseyNumber || null,
          [Validators.min(1), Validators.max(99)],
        ],
        height: [
          this.player?.height || null,
          [Validators.min(100), Validators.max(250)],
        ],
        weight: [
          this.player?.weight || null,
          [Validators.min(30), Validators.max(150)],
        ],
      }),

      // Etapa 4: Dados de saúde e emergência
      healthInfo: this.fb.group({
        emergencyContact: this.fb.group({
          name: [
            this.player?.emergencyContact?.name || '',
            [Validators.required, Validators.maxLength(100)],
          ],
          phone: [
            this.player?.emergencyContact?.phone || '',
            [Validators.required, Validators.pattern(/^\d{10,11}$/)],
          ],
          relationship: [
            this.player?.emergencyContact?.relationship || '',
            Validators.maxLength(50),
          ],
        }),
        bloodType: [this.player?.bloodType || ''],
        allergies: [this.player?.allergies || '', Validators.maxLength(200)],
        medicalConditions: [
          this.player?.medicalConditions || '',
          Validators.maxLength(200),
        ],
      }),

      // Campos administrativos (não visíveis no formulário)
      status: [this.player?.status || 'pending'],
    });

    if (this.player?.photo) {
      this.photoPreview = this.player.photo;
    }
  }

  onPhotoChange(event: Event): void {
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
        this.photoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Aqui você poderia implementar o upload da imagem para um servidor
      // e atualizar o valor do campo photo com a URL retornada
    }
  }

  nextStep(): void {
    if (this.isCurrentStepValid() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    let currentFormGroup: FormGroup;

    switch (this.currentStep) {
      case 1:
        currentFormGroup = this.playerForm.get('personalInfo') as FormGroup;
        break;
      case 2:
        currentFormGroup = this.playerForm.get('contactInfo') as FormGroup;
        break;
      case 3:
        currentFormGroup = this.playerForm.get('sportInfo') as FormGroup;
        break;
      case 4:
        currentFormGroup = this.playerForm.get('healthInfo') as FormGroup;
        break;
      case 5:
        // A etapa de confirmação é sempre válida
        return true;
      default:
        return false;
    }

    return currentFormGroup.valid;
  }

  hasError(
    formGroupName: string,
    controlName: string,
    errorName: string
  ): boolean {
    const control = this.getNestedControl(formGroupName, controlName);
    return (
      control?.invalid &&
      (control?.dirty || control?.touched) &&
      control?.errors?.[errorName]
    );
  }

  getErrorMessage(formGroupName: string, controlName: string): string {
    const control = this.getNestedControl(formGroupName, controlName);

    if (control?.errors?.['required']) {
      return 'Este campo é obrigatório';
    }
    if (control?.errors?.['maxlength']) {
      return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control?.errors?.['minlength']) {
      return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control?.errors?.['email']) {
      return 'Email inválido';
    }
    if (control?.errors?.['pattern']) {
      return 'Formato inválido';
    }
    if (control?.errors?.['min']) {
      return `Valor mínimo: ${control.errors['min'].min}`;
    }
    if (control?.errors?.['max']) {
      return `Valor máximo: ${control.errors['max'].max}`;
    }

    return 'Campo inválido';
  }

  private getNestedControl(formGroupName: string, controlName: string) {
    if (controlName.includes('.')) {
      const [nestedGroup, nestedControl] = controlName.split('.');
      return (this.playerForm.get(formGroupName) as FormGroup)
        ?.get(nestedGroup)
        ?.get(nestedControl);
    }
    return (this.playerForm.get(formGroupName) as FormGroup)?.get(controlName);
  }

  onSubmit(): void {
    if (this.playerForm.invalid) {
      // Marcar todos os campos como touched para mostrar erros
      this.markFormGroupTouched(this.playerForm);
      return;
    }

    this.isSubmitting = true;

    // Combinar todos os grupos do formulário em um único objeto
    const playerData = {
      ...this.playerForm.get('personalInfo')?.value,
      ...this.playerForm.get('contactInfo')?.value,
      ...this.playerForm.get('sportInfo')?.value,
      emergencyContact: this.playerForm.get('healthInfo.emergencyContact')
        ?.value,
      bloodType: this.playerForm.get('healthInfo')?.get('bloodType')?.value,
      allergies: this.playerForm.get('healthInfo')?.get('allergies')?.value,
      medicalConditions: this.playerForm
        .get('healthInfo')
        ?.get('medicalConditions')?.value,
      status: this.playerForm.get('status')?.value,
    };

    // Emitir evento com os dados do jogador
    this.save.emit(playerData);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if ((control as FormGroup)?.controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
