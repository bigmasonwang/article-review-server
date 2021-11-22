import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APIs working');
});

export default router;
