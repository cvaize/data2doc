'use strict';

exports.register = async (ctx) => {
  const { email, password } = ctx.request.body;
  ctx.assert(email && password, 400, 'The user info is malformed!');

  ctx.status = 201;
  ctx.body = { ok: true };
};
