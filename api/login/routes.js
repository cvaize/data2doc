'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/login`,
  });

  router.post('/', controller.login);

  return router;
};
