import Article from '../../src/models/article';

declare global {
  declare namespace Express {
    interface Request {
      userId: string;
      article: Article;
    }
  }
}
