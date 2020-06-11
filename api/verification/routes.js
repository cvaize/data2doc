'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/verification`,
  });

  router.post('/', controller.sendCode);

  return router;
};
