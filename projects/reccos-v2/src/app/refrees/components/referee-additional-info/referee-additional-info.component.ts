import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-referee-additional-info',
  templateUrl: './referee-additional-info.component.html',
  styleUrls: ['./referee-additional-info.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class RefereeAdditionalInfoComponent {
  @Input() initialData: any;
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  form: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      experienceYears: [
        '',
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      certificationLevel: ['', Validators.required],
      specialization: [''],
      photo: [null],
    });
  }

  ngOnInit() {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  onNext() {
    if (this.form.valid) {
      this.next.emit(this.form.value);
    }
  }

  onPrevious() {
    this.previous.emit();
  }

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.photoPreview = reader.result;
        this.form.patchValue({ photo: file });
        this.form.get('photo')?.updateValueAndValidity();
      };

      reader.readAsDataURL(file);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return control
      ? control.hasError(errorName) && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('min')) {
      return `O valor mínimo é ${control.errors?.['min'].min}`;
    }

    if (control?.hasError('max')) {
      return `O valor máximo é ${control.errors?.['max'].max}`;
    }

    return '';
  }
}
