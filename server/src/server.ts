import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!');
});