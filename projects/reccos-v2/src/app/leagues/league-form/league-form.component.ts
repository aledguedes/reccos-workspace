import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { TournamentFormatComponent } from './tournament-format/tournament-format.component';
import { LeagueFormService } from '../shared/league-form.service';

@Component({
  selector: 'app-league-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicInfoComponent,
    TournamentFormatComponent,
  ],
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss'],
})
export class LeagueFormComponent implements OnInit {
  leagueForm!: FormGroup;
  isSubmitting = false;
  currentStep = 1;
  totalSteps = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private leagueFormService: LeagueFormService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Inscrever-se nas mudanças do formulário para atualizar o serviço
    this.leagueForm.valueChanges.subscribe(values => {
      this.leagueFormService.updateFormData(values);
    });

    // Verificar se já existem dados no serviço para preencher o formulário
    const savedData = this.leagueFormService.getFormData();
    if (savedData && Object.keys(savedData).length > 0) {
      this.leagueForm.patchValue(savedData);
    }
  }

  initForm(): void {
    this.leagueForm = this.fb.group({
      name: ['', [Validators.required]],
      season: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['upcoming', [Validators.required]],
    });
  }

  // Navegação entre etapas
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      // Validar campos da etapa atual antes de avançar
      if (this.validateCurrentStep()) {
        this.currentStep++;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    // Só permite navegar para uma etapa se todas as etapas anteriores estiverem válidas
    if (step <= this.currentStep || this.canNavigateToStep(step)) {
      this.currentStep = step;
    }
  }

  // Validação de etapas
  validateCurrentStep(): boolean {
    let isValid = true;
    const controls = this.leagueForm.controls;

    // Validar campos específicos de cada etapa
    if (this.currentStep === 1) {
      // Etapa 1: Informações Básicas
      ['name', 'season'].forEach(field => {
        const control = this.leagueForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          isValid = false;
        }
      });
    } else if (this.currentStep === 2) {
      // Etapa 2: Configurações de Temporada
      ['startDate', 'endDate', 'status'].forEach(field => {
        const control = this.leagueForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          isValid = false;
        }
      });
    }

    return isValid;
  }

  canNavigateToStep(step: number): boolean {
    // Verificar se todas as etapas anteriores estão válidas
    for (let i = 1; i < step; i++) {
      this.currentStep = i;
      if (!this.validateCurrentStep()) {
        this.currentStep = i; // Manter na etapa inválida
        return false;
      }
    }
    return true;
  }

  canProceed(): boolean {
    return this.validateCurrentStep();
  }

  // Formatação para exibição na etapa de revisão
  formatDate(dateStr: string): string {
    if (!dateStr) return 'Não informado';

    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      upcoming: 'Em breve',
      active: 'Ativa',
      finished: 'Finalizada',
    };
    return statusMap[status] || status;
  }

  onSubmit(): void {
    if (this.leagueForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.leagueForm.controls).forEach(key => {
        const control = this.leagueForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Usar o serviço para preparar os dados para envio à API
    const leagueData = this.leagueFormService.prepareDataForApi();

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', leagueData);
      this.isSubmitting = false;
      // Limpar os dados do formulário após o envio bem-sucedido
      this.leagueFormService.clearFormData();
      this.router.navigate(['/leagues']);
    }, 1000);
  }

  onCancel(): void {
    this.router.navigate(['/leagues']);
  }
}
