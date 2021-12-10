/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, RequestHandler } from 'express';
import logger from '../config/winston';
import Article from '../models/article';
import User from '../models/user';

/**
 * GET api/articles
 * @param req
 * @param res
 * @returns
 */
export const getArticles: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const queries = {
    source: req.query.source,
    dateFrom: parseInt(req.query.dateFrom as string, 10),
    dateTo: parseInt(req.query.dateTo as string, 10),
    keyword: req.query.keyword,
    page: parseInt(req.query.page as string, 10),
  };

  // console.log(queries);

  if (!queries.page || queries.page <= 0) {
    queries.page = 1;
  }

  const filter: any = {};
  if (queries.source) {
    let regex = '';
    if (Array.isArray(queries.source)) {
      regex = queries.source.join('|');
    }
    if (typeof queries.source === 'string') {
      regex = queries.source;
    }
    filter.source = { $regex: `^${regex}`, $options: 'i' };
  }
  if (queries.dateFrom && queries.dateTo) {
    filter.date = { $gte: queries.dateFrom, $lte: queries.dateTo };
  }
  if (queries.dateFrom && !queries.dateTo) {
    filter.date = { $gte: queries.dateFrom };
  }
  if (!queries.dateFrom && queries.dateTo) {
    filter.date = { $lte: queries.dateTo };
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

/**
 * GET api/articles/:id
 * @param req
 * @param res
 */
export const getArticleById: RequestHandler = (req: Request, res: Response) => {
  res.sendStatus(200);
};

/**
 * POST api/articles/:articleId/translation
 * @param req
 * @param res
 */
export const createTranslation: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { article } = req;
  const { translation } = req.body;

  try {
    article.content_en = translation as string;
    await article.save();
    return res.sendStatus(201);
  } catch (error: any) {
    logger.log(error);
    res.sendStatus(500);
  }
};

/**
 * POST api/articles/:articleId/comments
 * @param req
 * @param res
 */
export const createComment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { articleId } = req.params;
  const { text } = req.body;
  const { userId } = req;
  let userName = 'Jhon Doe';
  try {
    const user = await User.findById(userId);
    if (user) {
      userName = user.userName;
    }
  } catch (error) {
    res.status(400).json({ error: 'User not found!' });
  }

  try {
    const article = await Article.findById(articleId);
    const comment = {
      commenterName: userName,
      commenterId: userId,
      text,
      date: Date(),
    };
    article?.comments.push(comment);
    await article?.save();
    return res.sendStatus(201);
  } catch (error: any) {
    logger.log(error);

    res.sendStatus(500);
  }
};

/**
 * PATCH api/articles/:articleId/comments/:commentId
 * @param req
 * @param res
 */
export const updateComment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { articleId, commentId } = req.params;
  const { text } = req.body;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(400).json({ error: 'article not found' });
    }

    const comment = article.comments.filter(
      (comment) => comment._id?.toString() === commentId
    )[0];
    if (!comment) {
      return res.status(400).json({ error: 'comment not found' });
    }

    if (comment.commenterId !== req.userId) {
      return res.status(403).json({ error: 'can only modify your comment' });
    }

    comment.text = text;
    await article.save();
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
};

/**
 * DELETE api/articles/:articleId/comments/:commentId
 * @param req
 * @param res
 */
export const destroyComment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { articleId, commentId } = req.params;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(400).json({ error: 'article not found' });
    }

    article.comments = article.comments.filter(
      (comment) =>
        comment._id?.toString() !== commentId &&
        comment.commenterId === req.userId
    );

    await article.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
};
