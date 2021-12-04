import express from 'express';
import articleRouter from './articles';
import userRouter from './users'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.use('/articles', articleRouter);

router.use('/users', userRouter);

export default router;
