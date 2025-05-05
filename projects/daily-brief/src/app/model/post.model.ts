import { ICategory } from './category.model';

export interface IPost {
  id: number;
  title: String;
  excerpt: String;
  content: String;
  image: String;
  author: String;
  date: String;
  readTime: String;
  category: ICategory;
}
