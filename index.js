/**
 * Node-JS Boilerplate
 * @author Yousuf Kalim
 */
require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'dev';
require('./database');

// Middleware
require('./middleware/common')(app);

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
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running in ${NODE_ENV} mode on port ` + port);
    });
  }
} else {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running in ${NODE_ENV} mode on port ` + port);
  });
}
