/**
 * Node-JS Boilerplate
 * @author Yousuf Kalim
 */
import 'database';
import express from 'express';
import middleware from 'middleware/common';
import { PORT, NODE_ENV } from 'config';

const app = express();

// Middleware
middleware(app);

// API Routes
app.use('/api', require('./routes'));

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
