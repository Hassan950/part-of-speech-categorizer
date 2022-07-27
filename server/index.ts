import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import httpStatus from 'http-status';
import { errorHandler } from './middlewares';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api', routes);

app.use((req, res, next) => {
  next({ message: 'Not found', statusCode: httpStatus.NOT_FOUND });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
