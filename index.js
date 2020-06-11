'use strict';

const http = require('http');
const server = require('./server');

const { port, hostname, protocol } = require('./config').server;

async function bootstrap() {
  /**
   * Add external services init as async operations (db, redis, etc...)
   * e.g.
   * await sequelize.authenticate()
   */
  return http.createServer(server.callback()).listen(port, hostname);
}

bootstrap()
  .then((server) => {
    console.log(`Server running at ${protocol}://${hostname}:${port}/`);
  })
  .catch((err) => {
    setImmediate(() => {
      console.error('Unable to run the server because of the following error:');
      console.error(err);
      process.exit();
    });
  });
