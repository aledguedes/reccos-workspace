import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-6">Contato</h1>
      <form class="max-w-lg mx-auto">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-1">Nome</label>
          <input
            id="name"
            type="text"
            [(ngModel)]="form.name"
            name="name"
            class="w-full p-3 rounded-lg border bg-[var(--primary-bg)] text-[var(--primary-text)]"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            [(ngModel)]="form.email"
            name="email"
            class="w-full p-3 rounded-lg border bg-[var(--primary-bg)] text-[var(--primary-text)]"
          />
        </div>
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium mb-1">Mensagem</label>
          <textarea
            id="message"
            [(ngModel)]="form.message"
            name="message"
            class="w-full p-3 rounded-lg border bg-[var(--primary-bg)] text-[var(--primary-text)]"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          (click)="submitForm()"
          class="bg-[var(--accent)] text-white px-6 py-3 rounded-lg hover:bg-blue-500"
        >
          Enviar
        </button>
      </form>
    </main>
  `,
  styles: [],
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };

  submitForm() {
    console.log('Formulário enviado:', this.form);
    // Implementar envio para backend
  }
}
