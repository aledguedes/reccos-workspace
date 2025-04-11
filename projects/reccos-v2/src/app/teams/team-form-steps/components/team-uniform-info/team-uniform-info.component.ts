import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-team-uniform-info',
  templateUrl: './team-uniform-info.component.html',
  styleUrls: ['./team-uniform-info.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
})
export class TeamUniformInfoComponent implements OnInit {
  @Input() formData: any;
  @Input() initialData: any = {};
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<any>();

  uniformForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.formData) {
      this.uniformForm.patchValue(this.formData);
    }
  }

  initForm(): void {
    this.uniformForm = this.fb.group({
      uniformMainColor: ['', [Validators.maxLength(50)]],
      uniformSecondaryColor: ['', [Validators.maxLength(50)]],
      uniformNotes: ['', [Validators.maxLength(500)]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.uniformForm.get(controlName);
    return control !== null && control.touched && control.hasError(errorName);
  }

  getErrorMessage(controlName: string): string {
    const control = this.uniformForm.get(controlName);

    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Este campo não pode ter mais que ${maxLength} caracteres`;
    }

    return '';
  }

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    if (this.uniformForm.valid) {
      // this.teamFormService.updateUniformInfo(this.uniformForm.value);
      this.next.emit(this.uniformForm.value);
    } else {
      this.uniformForm.markAllAsTouched();
    }
  }
}
