import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container mx-auto px-4 pt-24 pb-12">
      <div
        class="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div class="p-6 md:p-8">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">
            Entre em Contato
          </h1>

          <p class="mb-6 text-gray-600">
            Tem alguma dúvida, sugestão ou feedback? Preencha o formulário
            abaixo e entraremos em contato o mais breve possível.
          </p>

          <form
            [formGroup]="contactForm"
            (ngSubmit)="onSubmit()"
            class="space-y-4"
          >
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Nome</label
              >
              <input
                type="text"
                id="name"
                formControlName="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
                placeholder="Seu nome"
              />
              <div
                *ngIf="submitted && contactForm.get('name')?.errors"
                class="text-red-500 text-sm mt-1"
              >
                <span *ngIf="contactForm.get('name')?.errors?.['required']"
                  >Nome é obrigatório</span
                >
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                type="email"
                id="email"
                formControlName="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
                placeholder="seu.email@exemplo.com"
              />
              <div
                *ngIf="submitted && contactForm.get('email')?.errors"
                class="text-red-500 text-sm mt-1"
              >
                <span *ngIf="contactForm.get('email')?.errors?.['required']"
                  >Email é obrigatório</span
                >
                <span *ngIf="contactForm.get('email')?.errors?.['email']"
                  >Email inválido</span
                >
              </div>
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Mensagem</label
              >
              <textarea
                id="message"
                formControlName="message"
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition resize-none"
                placeholder="Sua mensagem"
              ></textarea>
              <div
                *ngIf="submitted && contactForm.get('message')?.errors"
                class="text-red-500 text-sm mt-1"
              >
                <span *ngIf="contactForm.get('message')?.errors?.['required']"
                  >Mensagem é obrigatória</span
                >
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full bg-[#1E88E5] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Enviar Mensagem
              </button>
            </div>

            <div
              *ngIf="submitted && success"
              class="p-4 bg-green-100 text-green-700 rounded-lg"
            >
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // In a real app, this would send the form data to a backend API
      this.success = true;
      this.contactForm.reset();
      setTimeout(() => (this.success = false), 5000);
    }
  }
}
