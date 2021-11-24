import mongoose from 'mongoose';

interface IArticle {
  date: number;
  url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  source: string;
}

const ArticleSchema = new mongoose.Schema({
  date: Number,
  url: String,
  title: String,
  title_en: String,
  content: String,
  content_en: String,
  source: String,
});

const Article = mongoose.model<IArticle>('article', ArticleSchema);

export default Article;