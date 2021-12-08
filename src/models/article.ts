import mongoose from 'mongoose';

type Comment = {
  _id?: string;
  commenterName: string;
  commenterId: string;
  date: string;
  text: string;
};
interface IArticle {
  date: number;
  url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  source: string;
  comments: Comment[];
}

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
