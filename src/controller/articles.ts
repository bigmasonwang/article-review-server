import { Request, Response, RequestHandler, query } from 'express';
import Article from '../models/article';

export const getArticles: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const queries = {
    source: req.query.source,
    dateFrom: req.query.dateFrom,
    dateTo: req.query.dateTo,
    keyword: req.query.keyword,
    page: parseInt(req.query.page as string, 10),
  };

  if (!queries.page || queries.page <= 0) {
    queries.page = 1;
  }

  const filter: any = {};
  if (queries.source) {
    filter.source = { $regex: `^${queries.source}`, $options: 'i' };
  }
  if (queries.dateFrom && queries.dateTo) {
    filter.date = { $gte: queries.dateFrom, $lte: queries.dateTo };
  }
  if (queries.keyword) {
    filter.$or = [
      { content: { $regex: `${queries.keyword}`, $options: 'i' } },
      { content_en: { $regex: `${queries.keyword}`, $options: 'i' } },
    ];
  }

  try {
    const count = await Article.find(filter).count();
    const pageLimit = 10;
    const totalPages = Math.ceil(count / pageLimit);
    if (totalPages > 0 && queries.page > totalPages) {
      queries.page = totalPages;
    }

    const articles = await Article.find(filter)
      .limit(pageLimit)
      .skip((queries.page - 1) * pageLimit)
      .exec();
    return res.json({ articles, totalPages, curPage: queries.page });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getArticleById: RequestHandler = (req: Request, res: Response) => {
  res.sendStatus(200);
};
