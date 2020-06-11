'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/password`,
  });

  router.post('/', controller.store).patch('/', controller.update);

  return router;
};
