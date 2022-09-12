import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import serviceRouter from './serviceRoutes';
dotenv.config();

const port = process.env.PORT ?? 3000;

export const app: Express = express();
app.use(express.json());
app.use('/service', serviceRouter);

export const server = app.listen(port, () => {
  console.log('\x1b[32m', `Server running in port ${port}`);
});
