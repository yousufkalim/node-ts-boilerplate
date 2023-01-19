/**
 * Node-JS Boilerplate
 * @author Yousuf Kalim
 */
import 'database';
import express, { Request, Response } from 'express';
import middleware from 'middleware/commons.middleware';
import { PORT, NODE_ENV } from 'config';
import welcomePage from 'utils/welcomePage';
import page404 from 'utils/404Page';

const app = express();

// Middleware
middleware(app);

// API Routes
app.get('/', (_req: Request, res: Response) => res.send(welcomePage)); // Welcome page
app.use('/api/v1', require('./routes/index.route')); // API Routes
app.use('/*', (req: Request, res: Response) => res.send(page404(req.originalUrl))); // 404 page

// If we are in production mode, then we will use the cluster mode to create multiple processes
if (NODE_ENV === 'prod') {
  const cluster = require('cluster');
  if (cluster.isMaster) {
    require('os')
      .cpus()
      .forEach(() => cluster.fork());
  } else {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  });
}
