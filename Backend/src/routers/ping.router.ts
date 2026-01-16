import express from 'express';

const pingRouter = express.Router();

pingRouter.get('/', (req, res) => {
  res.status(200).send('pong');
});

export default pingRouter;