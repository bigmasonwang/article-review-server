import express from 'express';
import {
  createComment,
  createTranslation,
  destroyComment,
  getArticleById,
  getArticles,
  updateComment,
} from '../controller/articles';
import authGuard from '../middleware/authGuard';
import findArticle from '../middleware/findArticle';

const router = express.Router();

router.get('/', getArticles);

router.get('/:id', getArticleById);

router.post('/:articleId/translation', authGuard, findArticle, createTranslation);

router.post('/:articleId/comments', authGuard, createComment);

router.patch('/:articleId/comments/:commentId', authGuard, updateComment);

router.delete('/:articleId/comments/:commentId', authGuard, destroyComment);

export default router;
