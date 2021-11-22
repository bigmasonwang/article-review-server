import { HttpError } from 'http-errors';
import { Request, Response } from 'express';

const errorHandler = (err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
};

export default errorHandler;
