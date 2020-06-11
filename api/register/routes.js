'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/register`,
  });

  router.post('/', controller.register);

  return router;
};
