import express from 'express';
import articleRouter from './articles';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.use('/articles', articleRouter);

export default router;
