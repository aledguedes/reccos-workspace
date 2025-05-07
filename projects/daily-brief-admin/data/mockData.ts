import { DashboardCard, DashboardSummary, Log, Post, User } from './modelMock';

export const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'como-comecar-investir-bolsa-valores',
    title: {
      'pt-BR': 'Como começar a investir na bolsa de valores em 2025',
      en: 'How to start investing in the stock market in 2025',
      es: 'Cómo empezar a invertir en la bolsa de valores en 2025',
    },
    content: {
      'pt-BR':
        'Neste artigo, vamos explorar as melhores estratégias para iniciantes que desejam começar a investir na bolsa de valores em 2025. Aprenda sobre os conceitos básicos, como escolher as primeiras ações e evitar erros comuns.\n\nA primeira coisa que você precisa saber é que investir na bolsa requer conhecimento e paciência. Não se trata de enriquecer da noite para o dia, mas sim de construir riqueza ao longo do tempo com decisões informadas e estratégicas...',
      en: "In this article, we will explore the best strategies for beginners who want to start investing in the stock market in 2025. Learn about the basics, how to choose your first stocks, and avoid common mistakes.\n\nThe first thing you need to know is that stock market investing requires knowledge and patience. It's not about getting rich overnight, but about building wealth over time with informed and strategic decisions...",
      es: 'En este artículo, exploraremos las mejores estrategias para principiantes que desean comenzar a invertir en la bolsa de valores en 2025. Aprenda sobre los conceptos básicos, cómo elegir sus primeras acciones y evitar errores comunes.\n\nLo primero que debe saber es que invertir en la bolsa requiere conocimiento y paciencia. No se trata de hacerse rico de la noche a la mañana, sino de construir riqueza a lo largo del tiempo con decisiones informadas y estratégicas...',
    },
    excerpt: {
      'pt-BR':
        'Aprenda como dar os primeiros passos no mundo dos investimentos na bolsa de valores com este guia completo para iniciantes.',
      en: 'Learn how to take your first steps in the world of stock market investments with this complete guide for beginners.',
      es: 'Aprenda cómo dar sus primeros pasos en el mundo de las inversiones en la bolsa de valores con esta guía completa para principiantes.',
    },
    status: 'pending',
    category: 'Finanças',
    author: 'Robô FinTech',
    featuredImage:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop',
    tags: [
      'investimentos',
      'bolsa de valores',
      'finanças pessoais',
      'iniciantes',
    ],
    createdAt: '2025-05-01T10:30:00.000Z',
    updatedAt: '2025-05-01T10:30:00.000Z',
    monetization: {
      adsenseEnabled: true,
      affiliateLinks: [
        {
          provider: 'hotmart',
          id: 'H12345',
          url: 'https://go.hotmart.com/H12345',
        },
      ],
    },
    versions: [
      {
        id: 'v1',
        createdAt: '2025-05-01T10:30:00.000Z',
        updatedBy: 'Sistema',
        content: {
          'pt-BR': 'Versão inicial do conteúdo em português',
          en: 'Initial version of content in English',
          es: 'Versión inicial del contenido en español',
        },
        title: {
          'pt-BR': 'Como começar a investir na bolsa de valores em 2025',
          en: 'How to start investing in the stock market in 2025',
          es: 'Cómo empezar a invertir en la bolsa de valores en 2025',
        },
      },
    ],
  },
  {
    id: '2',
    slug: 'inteligencia-artificial-transformando-marketing-digital',
    title: {
      'pt-BR':
        'Como a Inteligência Artificial está transformando o Marketing Digital',
      en: 'How Artificial Intelligence is transforming Digital Marketing',
      es: 'Cómo la Inteligencia Artificial está transformando el Marketing Digital',
    },
    content: {
      'pt-BR':
        'A inteligência artificial está revolucionando o marketing digital de várias maneiras, desde a personalização de conteúdo até a otimização de campanhas publicitárias. Neste artigo, exploraremos como as empresas estão utilizando IA para melhorar seus resultados.\n\nPrimeiro, vamos entender como algoritmos de aprendizado de máquina podem analisar o comportamento do usuário e fornecer recomendações altamente personalizadas...',
      en: "Artificial intelligence is revolutionizing digital marketing in various ways, from content personalization to advertising campaign optimization. In this article, we'll explore how companies are using AI to improve their results.\n\nFirst, let's understand how machine learning algorithms can analyze user behavior and provide highly personalized recommendations...",
      es: 'La inteligencia artificial está revolucionando el marketing digital de varias maneras, desde la personalización de contenido hasta la optimización de campañas publicitarias. En este artículo, exploraremos cómo las empresas están utilizando la IA para mejorar sus resultados.\n\nPrimero, vamos a entender cómo los algoritmos de aprendizaje automático pueden analizar el comportamiento del usuario y proporcionar recomendaciones altamente personalizadas...',
    },
    excerpt: {
      'pt-BR':
        'Descubra como a IA está mudando as estratégias de marketing digital e como as empresas podem se adaptar a esta nova realidade.',
      en: 'Discover how AI is changing digital marketing strategies and how companies can adapt to this new reality.',
      es: 'Descubra cómo la IA está cambiando las estrategias de marketing digital y cómo las empresas pueden adaptarse a esta nueva realidad.',
    },
    status: 'approved',
    category: 'Marketing',
    author: 'Robô MarketingGPT',
    featuredImage:
      'https://images.unsplash.com/photo-1595039838779-9d40c98e9c7c?q=80&w=2070&auto=format&fit=crop',
    tags: [
      'inteligência artificial',
      'marketing digital',
      'tecnologia',
      'automação',
    ],
    createdAt: '2025-05-02T14:45:00.000Z',
    updatedAt: '2025-05-03T09:15:00.000Z',
    publishDate: '2025-05-03T10:00:00.000Z',
    monetization: {
      adsenseEnabled: true,
      affiliateLinks: [
        {
          provider: 'hotmart',
          id: 'H54321',
          url: 'https://go.hotmart.com/H54321',
        },
        {
          provider: 'amazon',
          id: 'amzn-12345',
          url: 'https://amzn.to/12345',
        },
      ],
    },
    versions: [
      {
        id: 'v1',
        createdAt: '2025-05-02T14:45:00.000Z',
        updatedBy: 'Sistema',
        content: {
          'pt-BR': 'Versão inicial do conteúdo em português',
          en: 'Initial version of content in English',
          es: 'Versión inicial del contenido en español',
        },
        title: {
          'pt-BR': 'Como a IA está mudando o Marketing Digital',
          en: 'How AI is changing Digital Marketing',
          es: 'Cómo la IA está cambiando el Marketing Digital',
        },
      },
      {
        id: 'v2',
        createdAt: '2025-05-03T09:15:00.000Z',
        updatedBy: 'Admin',
        content: {
          'pt-BR': 'Conteúdo revisado e expandido em português',
          en: 'Revised and expanded content in English',
          es: 'Contenido revisado y expandido en español',
        },
        title: {
          'pt-BR':
            'Como a Inteligência Artificial está transformando o Marketing Digital',
          en: 'How Artificial Intelligence is transforming Digital Marketing',
          es: 'Cómo la Inteligencia Artificial está transformando el Marketing Digital',
        },
      },
    ],
  },
  {
    id: '3',
    slug: 'receitas-veganas-faceis-rapidas',
    title: {
      'pt-BR': '10 receitas veganas fáceis e rápidas para o dia a dia',
      en: '10 easy and quick vegan recipes for everyday',
      es: '10 recetas veganas fáciles y rápidas para el día a día',
    },
    content: {
      'pt-BR':
        'Neste artigo, apresentamos 10 receitas veganas deliciosas que você pode preparar em menos de 30 minutos. Perfeitas para quem tem uma rotina agitada mas não quer abrir mão de uma alimentação saudável e consciente.\n\nReceita 1: Macarrão com molho cremoso de castanhas\nIngredientes:\n- 250g de macarrão de sua preferência\n- 1 xícara de castanhas de caju (deixadas de molho por pelo menos 4 horas)\n...',
      en: "In this article, we present 10 delicious vegan recipes that you can prepare in less than 30 minutes. Perfect for those with a busy routine who don't want to give up healthy and conscious eating.\n\nRecipe 1: Pasta with creamy cashew sauce\nIngredients:\n- 250g pasta of your choice\n- 1 cup cashews (soaked for at least 4 hours)\n...",
      es: 'En este artículo, presentamos 10 deliciosas recetas veganas que puedes preparar en menos de 30 minutos. Perfectas para quienes tienen una rutina ocupada pero no quieren renunciar a una alimentación saludable y consciente.\n\nReceta 1: Pasta con salsa cremosa de anacardos\nIngredientes:\n- 250g de pasta de su elección\n- 1 taza de anacardos (remojados durante al menos 4 horas)\n...',
    },
    excerpt: {
      'pt-BR':
        'Aprenda a preparar pratos veganos deliciosos e práticos em menos de 30 minutos para uma rotina mais saudável.',
      en: 'Learn to prepare delicious and practical vegan dishes in less than 30 minutes for a healthier routine.',
      es: 'Aprenda a preparar platos veganos deliciosos y prácticos en menos de 30 minutos para una rutina más saludable.',
    },
    status: 'rejected',
    category: 'Culinária',
    author: 'Robô ChefsGPT',
    featuredImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    tags: ['vegano', 'receitas', 'culinária', 'alimentação saudável'],
    createdAt: '2025-05-04T08:20:00.000Z',
    updatedAt: '2025-05-05T11:10:00.000Z',
    monetization: {
      adsenseEnabled: true,
      affiliateLinks: [
        {
          provider: 'amazon',
          id: 'amzn-67890',
          url: 'https://amzn.to/67890',
        },
        {
          provider: 'hotmart',
          id: 'H67890',
          url: 'https://go.hotmart.com/H67890',
        },
      ],
    },
    versions: [
      {
        id: 'v1',
        createdAt: '2025-05-04T08:20:00.000Z',
        updatedBy: 'Sistema',
        content: {
          'pt-BR': 'Versão inicial do conteúdo em português',
          en: 'Initial version of content in English',
          es: 'Versión inicial del contenido en español',
        },
        title: {
          'pt-BR': '10 receitas veganas fáceis e rápidas para o dia a dia',
          en: '10 easy and quick vegan recipes for everyday',
          es: '10 recetas veganas fáciles y rápidas para el día a día',
        },
      },
    ],
  },
  {
    id: '4',
    slug: 'tendencias-design-grafico-2025',
    title: {
      'pt-BR': 'As principais tendências de design gráfico para 2025',
      en: 'The main graphic design trends for 2025',
      es: 'Las principales tendencias de diseño gráfico para 2025',
    },
    content: {
      'pt-BR':
        'O design gráfico está em constante evolução, e 2025 não será diferente. Neste artigo, exploramos as tendências que devem dominar o cenário criativo no próximo ano, desde tipografia experimental até design com foco em sustentabilidade.\n\n1. Tipografia Experimental e Dinâmica\nA tipografia está se tornando cada vez mais um elemento de expressão artística...',
      en: 'Graphic design is constantly evolving, and 2025 will be no different. In this article, we explore the trends that should dominate the creative scene next year, from experimental typography to sustainability-focused design.\n\n1. Experimental and Dynamic Typography\nTypography is increasingly becoming an element of artistic expression...',
      es: 'El diseño gráfico está en constante evolución, y 2025 no será diferente. En este artículo, exploramos las tendencias que deben dominar el escenario creativo el próximo año, desde tipografía experimental hasta diseño con enfoque en sostenibilidad.\n\n1. Tipografía Experimental y Dinámica\nLa tipografía se está convirtiendo cada vez más en un elemento de expresión artística...',
    },
    excerpt: {
      'pt-BR':
        'Conheça as tendências de design gráfico que vão dominar o mercado criativo em 2025 e como se preparar para elas.',
      en: 'Learn about the graphic design trends that will dominate the creative market in 2025 and how to prepare for them.',
      es: 'Conozca las tendencias de diseño gráfico que dominarán el mercado creativo en 2025 y cómo prepararse para ellas.',
    },
    status: 'pending',
    category: 'Design',
    author: 'Robô DesignGPT',
    featuredImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    tags: ['design gráfico', 'tendências', 'criatividade', 'visual'],
    createdAt: '2025-05-05T16:40:00.000Z',
    updatedAt: '2025-05-05T16:40:00.000Z',
    monetization: {
      adsenseEnabled: true,
      affiliateLinks: [
        {
          provider: 'hotmart',
          id: 'H24680',
          url: 'https://go.hotmart.com/H24680',
        },
      ],
    },
    versions: [
      {
        id: 'v1',
        createdAt: '2025-05-05T16:40:00.000Z',
        updatedBy: 'Sistema',
        content: {
          'pt-BR': 'Versão inicial do conteúdo em português',
          en: 'Initial version of content in English',
          es: 'Versión inicial del contenido en español',
        },
        title: {
          'pt-BR': 'As principais tendências de design gráfico para 2025',
          en: 'The main graphic design trends for 2025',
          es: 'Las principales tendencias de diseño gráfico para 2025',
        },
      },
    ],
  },
  {
    id: '5',
    slug: 'guia-completo-energia-solar-residencial',
    title: {
      'pt-BR':
        'Guia completo sobre energia solar residencial: economia e sustentabilidade',
      en: 'Complete guide to residential solar energy: economy and sustainability',
      es: 'Guía completo sobre energía solar residencial: economía y sostenibilidad',
    },
    content: {
      'pt-BR':
        'A energia solar está se tornando cada vez mais acessível para residências, permitindo que famílias economizem na conta de luz enquanto contribuem para um planeta mais sustentável. Neste guia completo, explicamos tudo o que você precisa saber antes de investir em um sistema fotovoltaico.\n\nEntendendo o Básico da Energia Solar\nSistemas de energia solar residencial funcionam através de painéis fotovoltaicos que captam a luz do sol e a convertem em eletricidade...',
      en: 'Solar energy is becoming increasingly accessible for homes, allowing families to save on electricity bills while contributing to a more sustainable planet. In this complete guide, we explain everything you need to know before investing in a photovoltaic system.\n\nUnderstanding the Basics of Solar Energy\nResidential solar energy systems work through photovoltaic panels that capture sunlight and convert it into electricity...',
      es: 'La energía solar se está volviendo cada vez más accesible para hogares, permitiendo que las familias ahorren en la factura de electricidad mientras contribuyen a un planeta más sostenible. En esta guía completa, explicamos todo lo que necesita saber antes de invertir en un sistema fotovoltaico.\n\nEntendiendo lo Básico de la Energía Solar\nLos sistemas de energía solar residencial funcionan a través de paneles fotovoltaicos que captan la luz solar y la convierten en electricidad...',
    },
    excerpt: {
      'pt-BR':
        'Descubra como a energia solar pode reduzir suas contas de luz e ajudar o meio ambiente com este guia completo para residências.',
      en: 'Discover how solar energy can reduce your electricity bills and help the environment with this complete guide for homes.',
      es: 'Descubra cómo la energía solar puede reducir sus facturas de electricidad y ayudar al medio ambiente con esta guía completa para hogares.',
    },
    status: 'approved',
    category: 'Sustentabilidade',
    author: 'Robô EcoGPT',
    featuredImage:
      'https://images.unsplash.com/photo-1611365892117-00d043284c8c?q=80&w=2070&auto=format&fit=crop',
    tags: ['energia solar', 'sustentabilidade', 'economia', 'residencial'],
    createdAt: '2025-05-03T11:25:00.000Z',
    updatedAt: '2025-05-04T13:50:00.000Z',
    publishDate: '2025-05-04T15:00:00.000Z',
    monetization: {
      adsenseEnabled: true,
      affiliateLinks: [
        {
          provider: 'amazon',
          id: 'amzn-13579',
          url: 'https://amzn.to/13579',
        },
      ],
    },
    versions: [
      {
        id: 'v1',
        createdAt: '2025-05-03T11:25:00.000Z',
        updatedBy: 'Sistema',
        content: {
          'pt-BR': 'Versão inicial do conteúdo em português',
          en: 'Initial version of content in English',
          es: 'Versión inicial del contenido en español',
        },
        title: {
          'pt-BR': 'Guia sobre energia solar residencial',
          en: 'Guide to residential solar energy',
          es: 'Guía sobre energía solar residencial',
        },
      },
      {
        id: 'v2',
        createdAt: '2025-05-04T13:50:00.000Z',
        updatedBy: 'Admin',
        content: {
          'pt-BR': 'Conteúdo revisado e expandido em português',
          en: 'Revised and expanded content in English',
          es: 'Contenido revisado y expandido en español',
        },
        title: {
          'pt-BR':
            'Guia completo sobre energia solar residencial: economia e sustentabilidade',
          en: 'Complete guide to residential solar energy: economy and sustainability',
          es: 'Guía completa sobre energía solar residencial: economía y sostenibilidad',
        },
      },
    ],
  },
];

export const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2025-05-03T09:15:00.000Z',
    action: 'Post aprovado',
    user: 'Admin',
    details: {
      postId: '2',
      postTitle:
        'Como a Inteligência Artificial está transformando o Marketing Digital',
      change: 'Título e conteúdo revisados',
    },
  },
  {
    id: '2',
    timestamp: '2025-05-04T13:50:00.000Z',
    action: 'Post aprovado',
    user: 'Admin',
    details: {
      postId: '5',
      postTitle:
        'Guia completo sobre energia solar residencial: economia e sustentabilidade',
      change: 'Título e conteúdo expandidos',
    },
  },
  {
    id: '3',
    timestamp: '2025-05-05T11:10:00.000Z',
    action: 'Post rejeitado',
    user: 'Editor',
    details: {
      postId: '3',
      postTitle: '10 receitas veganas fáceis e rápidas para o dia a dia',
      change: 'Conteúdo não atende aos critérios de qualidade',
    },
  },
  {
    id: '4',
    timestamp: '2025-05-01T10:30:00.000Z',
    action: 'Post criado',
    user: 'Sistema',
    details: {
      postId: '1',
      postTitle: 'Como começar a investir na bolsa de valores em 2025',
    },
  },
  {
    id: '5',
    timestamp: '2025-05-02T14:45:00.000Z',
    action: 'Post criado',
    user: 'Sistema',
    details: {
      postId: '2',
      postTitle: 'Como a IA está mudando o Marketing Digital',
    },
  },
  {
    id: '6',
    timestamp: '2025-05-04T08:20:00.000Z',
    action: 'Post criado',
    user: 'Sistema',
    details: {
      postId: '3',
      postTitle: '10 receitas veganas fáceis e rápidas para o dia a dia',
    },
  },
  {
    id: '7',
    timestamp: '2025-05-05T16:40:00.000Z',
    action: 'Post criado',
    user: 'Sistema',
    details: {
      postId: '4',
      postTitle: 'As principais tendências de design gráfico para 2025',
    },
  },
  {
    id: '8',
    timestamp: '2025-05-03T11:25:00.000Z',
    action: 'Post criado',
    user: 'Sistema',
    details: {
      postId: '5',
      postTitle: 'Guia sobre energia solar residencial',
    },
  },
];

export const blogDashboardCards: DashboardCard[] = [
  {
    title: 'Total de Posts',
    value: 5,
    icon: 'ri-file-text-line',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Posts Pendentes',
    value: 2,
    icon: 'ri-time-line',
    iconBgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Posts Aprovados',
    value: 2,
    icon: 'ri-checkbox-circle-line',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Posts Rejeitados',
    value: 1,
    icon: 'ri-close-circle-line',
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    title: 'Visualizações Hoje',
    value: '1.250',
    icon: 'ri-eye-line',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: {
      value: 12,
      isPositive: true,
    },
  },
  {
    title: 'Visualizações no Mês',
    value: '28.500',
    icon: 'ri-bar-chart-line',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: {
      value: 8,
      isPositive: true,
    },
  },
  {
    title: 'Cliques em Afiliados',
    value: 145,
    icon: 'ri-external-link-line',
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    trend: {
      value: 5,
      isPositive: true,
    },
  },
  {
    title: 'Conversões de Afiliados',
    value: 23,
    icon: 'ri-money-dollar-circle-line',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: {
      value: 3,
      isPositive: true,
    },
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@dailybrief.com',
    role: 'admin',
    avatar:
      'https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff',
    createdAt: '2025-01-01T00:00:00.000Z',
    lastActive: '2025-05-06T08:30:00.000Z',
  },
  {
    id: '2',
    name: 'Editor Principal',
    email: 'editor@dailybrief.com',
    role: 'editor',
    avatar:
      'https://ui-avatars.com/api/?name=Editor+Principal&background=3B82F6&color=fff',
    createdAt: '2025-01-15T00:00:00.000Z',
    lastActive: '2025-05-05T16:45:00.000Z',
  },
  {
    id: '3',
    name: 'Visualizador',
    email: 'viewer@dailybrief.com',
    role: 'viewer',
    avatar:
      'https://ui-avatars.com/api/?name=Visualizador&background=3B82F6&color=fff',
    createdAt: '2025-02-10T00:00:00.000Z',
    lastActive: '2025-05-04T10:20:00.000Z',
  },
];

// Chart data for posts by status - Pie chart
export const postsByStatusChart: any[] = [
  { name: 'Pendentes', value: 2 },
  { name: 'Aprovados', value: 2 },
  { name: 'Rejeitados', value: 1 },
];

// Chart data for views over time - Line chart
export const viewsOverTimeChart: any[] = [
  { name: '1 Mai', value: 850 },
  { name: '2 Mai', value: 940 },
  { name: '3 Mai', value: 1100 },
  { name: '4 Mai', value: 1050 },
  { name: '5 Mai', value: 1200 },
  { name: '6 Mai', value: 1250 },
  { name: '7 Mai', value: 0 },
];

// Chart data for traffic sources - Bar chart
export const trafficSourcesChart: any[] = [
  { name: 'Google', value: 15000 },
  { name: 'Redes Sociais', value: 8500 },
  { name: 'Direto', value: 2500 },
  { name: 'Email', value: 1500 },
  { name: 'Outros', value: 1000 },
];

// Chart data for affiliate performance
export const affiliatePerformanceChart: any[] = [
  {
    name: 'Hotmart',
    series: [
      { name: 'Cliques', value: 85 },
      { name: 'Conversões', value: 12 },
    ],
  },
  {
    name: 'Amazon',
    series: [
      { name: 'Cliques', value: 45 },
      { name: 'Conversões', value: 8 },
    ],
  },
  {
    name: 'ClickBank',
    series: [
      { name: 'Cliques', value: 15 },
      { name: 'Conversões', value: 3 },
    ],
  },
];
