'use strict';

const controller = require('./controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/generate`,
  });

  router.post('/docx', controller.docx);

  return router;
};
