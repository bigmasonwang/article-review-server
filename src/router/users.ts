import express from 'express';
import {
  getAllUsers,
  getReceivedArticles,
  logIn,
  sendArticles,
  signUp,
} from '../controller/users';
import { UserSchema } from '../dto/user';
import authGuard from '../middleware/authGuard';
import { validate } from '../middleware/validateRequest';

const router = express.Router();

router.get('/', authGuard, getAllUsers);

router.post('/signup', validate(UserSchema), signUp);

router.post('/login', logIn);

router.get('/articles', authGuard, getReceivedArticles);

router.post('/articles', authGuard, sendArticles);

export default router;
