import express from 'express';
import {
  createComment,
  destroyComment,
  getArticleById,
  getArticles,
  updateComment,
} from '../controller/articles';
import authGuard from '../middleware/authGuard';

const router = express.Router();

router.get('/', getArticles);

router.get('/:id', getArticleById);

router.post('/:articleId', authGuard, createComment);

router.patch('/:articleId/:commentId', authGuard, updateComment);

router.delete('/:articleId/:commentId', authGuard, destroyComment);

export default router;
