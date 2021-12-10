import { Request, Response, NextFunction } from 'express';
import Article from '../models/article';

const findArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(400).json({ error: 'article not found' });
    }
    req.article = article;
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default findArticle;
