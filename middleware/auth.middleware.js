const { test } = require('../config');

module.exports = async (ctx, next) => {
  ctx.auth = {
    user: {
      ...test.user,
    },
  };
  await next();
};
