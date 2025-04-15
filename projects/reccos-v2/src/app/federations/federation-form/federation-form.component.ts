import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-federation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './federation-form.component.html',
  styleUrl: './federation-form.component.scss',
})
export class FederationFormComponent {
  federationId = 0;
  leagueForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      season: [''],
      status: ['ativa', Validators.required],
      federation_id: [this.federationId],
    });
  }

  onSubmit() {
    if (this.leagueForm.valid) {
      console.log('Liga criada:', this.leagueForm.value);
      // Enviar para backend com service aqui
    } else {
      this.leagueForm.markAllAsTouched();
    }
  }

  cancel() {
    console.log('Cancelado');
    // Aqui pode fechar modal ou navegar para outra rota
  }
}
