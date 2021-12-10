import mongoose from 'mongoose';
import { IArticle } from '../types/article';

const ArticleSchema = new mongoose.Schema({
  date: Number,
  url: String,
  title: String,
  title_en: String,
  content: String,
  content_en: String,
  source: String,
  comments: [
    {
      commenterName: String,
      commenterId: String,
      date: Date,
      text: String,
    },
  ],
});

const Article = mongoose.model<IArticle>('article', ArticleSchema);

export default Article;
