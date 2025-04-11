import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RefereeBasicInfoComponent } from '../components/referee-basic-info/referee-basic-info.component';
import { RefereeContactInfoComponent } from '../components/referee-contact-info/referee-contact-info.component';
import { RefereeStatusInfoComponent } from '../components/referee-status-info/referee-status-info.component';
import { RefereeAdditionalInfoComponent } from '../components/referee-additional-info/referee-additional-info.component';
import { Router } from 'express';

@Component({
  selector: 'app-refree-form',
  imports: [
    CommonModule,
    RefereeBasicInfoComponent,
    RefereeAdditionalInfoComponent,
    RefereeContactInfoComponent,
    RefereeStatusInfoComponent,
  ],
  templateUrl: './refree-form.component.html',
  styleUrl: './refree-form.component.scss',
})
export class RefreeFormComponent {
  @Input() currentStep = 1;
  @Input() totalSteps = 3;
  @Input() formData: any = {};
  @Output() stepChange = new EventEmitter<number>();
  @Output() submit = new EventEmitter<any>();

  onNext(formData: any): void {
    this.formData = { ...this.formData, ...formData };
    this.stepChange.emit(this.currentStep + 1);
  }

  onPrevious(): void {
    this.stepChange.emit(this.currentStep - 1);
  }

  onSubmit(formData: any): void {
    this.submit.emit({ ...this.formData, ...formData });
  }

  onCancelTeam(): void {
    // Navegar de volta para a lista de times
    // this.router.navigate(['/teams']);;
  }
}
