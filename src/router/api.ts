import express from 'express';
import { createInvitations } from '../controller/invitations';
import articleRouter from './articles';
import userRouter from './users';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

router.post('/invitation', createInvitations);

router.use('/articles', articleRouter);

router.use('/users', userRouter);

export default router;
