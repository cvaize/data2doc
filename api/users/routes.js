'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
