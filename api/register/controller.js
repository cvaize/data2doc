'use strict';

const trimObject = require('../../utils/trimObject.util');
const { user: userModel } = require('../../models');

exports.register = async (ctx) => {
  const { email, password } = ctx.request.body;

  const frd = trimObject({ email, password });

  const errors = await userModel.validateFrd(frd);
  if (errors.length) {
    ctx.status = 400;
    ctx.body = errors;
  } else {
    const user = await userModel.register(frd);
    ctx.status = 200;
    ctx.body = { user: user, jwt: user.generateJwt() };
  }
};
