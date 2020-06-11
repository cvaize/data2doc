const { port, hostname, protocol, apiVersion } = require('../config').server;

module.exports = function (path) {
  return `${protocol}://${hostname}:${port}/v/${apiVersion}` + path;
};
