import { ICategory } from '../model/category.model';
import { IPost } from '../model/post.model';

export const CATEGORIES: ICategory[] = [
  { id: 1, name: 'Tecnologia', slug: 'tecnologia' },
  { id: 2, name: 'IA', slug: 'ia' },
  { id: 3, name: 'Web', slug: 'web' },
  { id: 4, name: 'Ferramentas', slug: 'ferramentas' },
];

export const POSTS: IPost[] = [
  {
    id: 1,
    title: 'Como a IA está revolucionando a produtividade pessoal',
    excerpt: 'Explore ferramentas que ajudam a economizar tempo...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1676299081847-824930954b23?w=800',
    author: 'Autor',
    date: '24 de Abril, 2025',
    readTime: '5 min',
    category: CATEGORIES[1], // IA
  },
  {
    id: 2,
    title: 'Novos Avanços em Tecnologia de Smartphones',
    excerpt: 'Descubra as mais recentes inovações em smartphones...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
    author: 'Autor',
    date: '24 de Abril, 2025',
    readTime: '4 min',
    category: CATEGORIES[0], // Tecnologia
  },
  {
    id: 3,
    title: 'Como a IA Está Mudando o Local de Trabalho',
    excerpt: 'Insights sobre como a inteligência artificial está transformando...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800',
    author: 'Autor',
    date: '24 de Abril, 2025',
    readTime: '6 min',
    category: CATEGORIES[1], // IA
  },
  {
    id: 4,
    title: 'O Impacto do 5G nas Comunicações Modernas',
    excerpt: 'Uma análise aprofundada sobre como o 5G está revolucionando...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1521710462111-527e36eda65e?q=80&w=800',
    author: 'Autor',
    date: '23 de Abril, 2025',
    readTime: '5 min',
    category: CATEGORIES[0], // Tecnologia
  },
  {
    id: 5,
    title: 'Desenvolvimentos Recentes em Inteligência Artificial',
    excerpt: 'Avanços significativos em tecnologia de IA...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800',
    author: 'Autor',
    date: '28 de Abril, 2025',
    readTime: '7 min',
    category: CATEGORIES[1], // IA
  },
  {
    id: 6,
    title: 'IA Generativa e Seu Impacto na Criatividade',
    excerpt: 'Como os modelos de IA generativa estão transformando...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800',
    author: 'Autor',
    date: '27 de Abril, 2025',
    readTime: '5 min',
    category: CATEGORIES[2], // IA Generativa
  },
  {
    id: 7,
    title: 'Ética em IA: Desafios e Considerações',
    excerpt: 'Explorando os dilemas éticos e questões importantes...',
    content: 'Conteúdo completo...',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800',
    author: 'Autor',
    date: '26 de Abril, 2025',
    readTime: '6 min',
    category: CATEGORIES[3], // Ética em IA
  },
];
