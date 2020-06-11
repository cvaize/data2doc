'use strict';

const {
  username,
  database,
  password,
  dialect,
  host,
  port,
} = require('../config').database;

module.exports = {
  database,
  username,
  password,
  dialect,
  host,
  port,
};
