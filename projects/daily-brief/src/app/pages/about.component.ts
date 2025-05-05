import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold mb-6">Sobre o DailyBrief</h1>
      <section class="prose max-w-none text-[var(--primary-text)]">
        <h2>Missão</h2>
        <p>
          O DailyBrief é dedicado a fornecer insights diários sobre tecnologia, inovação e
          tendências que moldam o futuro.
        </p>
        <h2>Quem Somos</h2>
        <p>
          Somos uma equipe de entusiastas por tecnologia, comprometidos em compartilhar conhecimento
          de forma acessível e envolvente.
        </p>
      </section>
    </main>
  `,
  styles: [],
})
export class AboutComponent {}
