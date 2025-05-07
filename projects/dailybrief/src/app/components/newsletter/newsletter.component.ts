import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="py-12 md:py-16 bg-muted/50">
      <div class="container mx-auto px-4">
        <div class="rounded-lg bg-primary/5 p-8 relative overflow-hidden">
          <h2 class="text-3xl font-bold mb-4">
            Inscreva-se na nossa Newsletter
          </h2>
          <p class="text-muted-foreground mb-6 max-w-[600px]">
            Receba as últimas notícias e atualizações sobre tecnologia, IA e
            ciência de dados diretamente na sua caixa de entrada.
          </p>
          <form class="flex flex-col sm:flex-row gap-4 max-w-lg">
            <input
              type="email"
              placeholder="Seu email"
              [(ngModel)]="email"
              name="email"
              required
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              class="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium"
              [disabled]="!email"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* Estilos exclusivos do NewsletterComponent */
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
      .text-primary-foreground {
        color: hsl(var(--primary-foreground));
      }
    `,
  ],
})
export class NewsletterComponent {
  email: string = '';
}
