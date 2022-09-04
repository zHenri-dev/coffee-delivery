import express from 'express';

import { coffees } from './mongodb';

export const routes = express.Router();

routes.get('/coffees', async (req, res) => {
  const coffeesList = await coffees.find({});
  return res.status(200).send(coffeesList);
});