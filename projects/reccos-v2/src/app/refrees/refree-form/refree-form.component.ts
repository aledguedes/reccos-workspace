import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importando os componentes de cada etapa
import { RefreePersonalInfoComponent } from '../components/refree-personal-info/refree-personal-info.component';
import { RefreeProfessionalInfoComponent } from '../components/refree-professional-info/refree-professional-info.component';
import { RefreeConfirmationComponent } from '../components/refree-confirmation/refree-confirmation.component';
import { ContactInfoGenericComponent } from '../../shared/components/contact-info-generic/contact-info-generic.component';

// Interface para o modelo de árbitro
interface IRefree {
  id?: number;
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  address: string;
  availability: 'disponível' | 'indisponível';
  registrationDate: string;
  status: 'ativo' | 'pendente' | 'suspenso';
  photo?: string;
  email?: string;
  experience?: 'iniciante' | 'intermediário' | 'experiente';
  specialty?: 'principal' | 'auxiliar' | 'ambos';
}

@Component({
  selector: 'app-refree-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RefreePersonalInfoComponent,
    ContactInfoGenericComponent,
    RefreeProfessionalInfoComponent,
    RefreeConfirmationComponent,
  ],
  templateUrl: './refree-form.component.html',
  styleUrl: './refree-form.component.scss',
})
export class RefreeFormComponent implements OnInit {
  @Input() refree: IRefree | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  // Dados agregados de todas as etapas
  refreeData: any = {};
  photoPreview: string | null = null;
  totalSteps = 4;
  currentStep = 1;

  isSubmitting = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.initializeRefreeData();
  }

  initializeRefreeData(): void {
    // Inicializar dados do árbitro a partir do input, se existir
    if (this.refree) {
      this.refreeData = { ...this.refree };
      this.photoPreview = this.refree.photo || null;
    } else {
      // Inicializar com valores padrão para um novo árbitro
      this.refreeData = {
        status: 'pendente',
        availability: 'disponível',
        registrationDate: new Date().toISOString(),
      };
    }
  }

  // Métodos para navegação entre etapas
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Métodos para receber dados dos componentes filhos
  onPersonalInfoNext(data: any): void {
    this.refreeData = { ...this.refreeData, ...data };
    this.photoPreview = data.photo;
    this.nextStep();
  }

  onContactInfoNext(data: any): void {
    this.refreeData = { ...this.refreeData, ...data };
    this.nextStep();
  }

  onProfessionalInfoNext(data: any): void {
    this.refreeData = { ...this.refreeData, ...data };
    this.nextStep();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    // Adicionar status ao objeto final se não existir
    const finalRefreeData = {
      ...this.refreeData,
      status: this.refree?.status || 'pendente',
    };

    // Emitir evento com os dados do árbitro
    this.save.emit(finalRefreeData);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onCancelRefree(): void {
    // Navegar de volta para a lista de árbitros
    this.router.navigate(['/refrees']);
  }
}
