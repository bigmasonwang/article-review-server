import app from './app';
import logger from './config/winston';

const port = process.env.PORT || '4000';
app.listen(port, () => {
  logger.info(`Listen on ${port}`);
  logger;
});
