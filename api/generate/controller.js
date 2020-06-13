'use strict';

exports.docx = async (ctx) => {
  const { data } = ctx.request.body;
  ctx.assert(data, 400, 'Document data is missing!');

  ctx.status = 200;
  ctx.body = { ok: true };
};
