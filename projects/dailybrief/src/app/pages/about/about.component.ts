import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-24 pb-12">
      <div
        class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div class="p-6 md:p-8">
          <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Sobre o DailyBrief
          </h1>

          <div class="prose prose-lg max-w-none">
            <h2 class="text-2xl font-semibold mb-4 text-gray-800">
              Nossa Missão
            </h2>
            <p class="mb-6">
              O DailyBrief nasceu com a missão de trazer informações relevantes
              e atualizadas sobre o mundo da tecnologia e inteligência
              artificial. Acreditamos que o conhecimento deve ser acessível e
              compreensível para todos, independentemente do nível técnico.
            </p>

            <h2 class="text-2xl font-semibold mb-4 text-gray-800">
              Quem Somos
            </h2>
            <p class="mb-6">
              Somos uma equipe de entusiastas e profissionais de tecnologia
              apaixonados por inovação e pelo impacto que ela tem em nossas
              vidas. Nossa equipe é composta por jornalistas especializados,
              desenvolvedores, designers e pesquisadores que trabalham juntos
              para trazer o melhor conteúdo sobre tecnologia, IA,
              desenvolvimento web e ferramentas digitais.
            </p>

            <h2 class="text-2xl font-semibold mb-4 text-gray-800">
              Nossos Valores
            </h2>
            <ul class="list-disc pl-6 mb-6">
              <li class="mb-2">Precisão e confiabilidade nas informações</li>
              <li class="mb-2">Conteúdo acessível e de qualidade</li>
              <li class="mb-2">Inovação e atualização constante</li>
              <li class="mb-2">Respeito à diversidade de opiniões</li>
              <li class="mb-2">Compromisso com a ética na tecnologia</li>
            </ul>

            <h2 class="text-2xl font-semibold mb-4 text-gray-800">
              Nossa História
            </h2>
            <p>
              Fundado em 2024, o DailyBrief surgiu da necessidade de criar um
              espaço dedicado às notícias e análises sobre o avanço tecnológico
              e suas implicações na sociedade. Desde então, temos trabalhado
              para ser uma fonte confiável de informações, ajudando nossos
              leitores a navegar pelo mundo cada vez mais digital e conectado.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}
