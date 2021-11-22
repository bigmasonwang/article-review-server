import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import apiRouter from './router/api';
import notFind from './middleware/notFind';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(notFind);

// error handler
app.use(errorHandler);

export default app;
