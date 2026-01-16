import express from 'express';
import logger from '../config/logger.config';

const pingRouter = express.Router();

pingRouter.get('/', (req, res) => {
    logger.info('Ping request received');
  res.status(200).send('pong');
});

export default pingRouter;