'use strict';

const Schema = require('validate');

const { appToken } = require('../config').server;
const emailValidator = require('../utils/emailValidator.util');
const uniqueValidator = require('../utils/uniqueValidator.util');
const validateMap = require('../utils/validateMap.util');
const jwt = require('jsonwebtoken');

const modelName = 'user';

const validateRules = {
  email: {
    type: String,
    required: true,
    length: { min: 3, max: 255 },
    use: {
      emailValidator,
    },
  },
  password: {
    type: String,
    required: true,
    length: { min: 3, max: 255 },
  },
};

const userSchema = new Schema(validateRules);

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    modelName,
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      remember_token: DataTypes.STRING,
      api_token: DataTypes.STRING,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'created_at',
    },
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  /**
   * no static methods
   */
  user.prototype.getEmail = function () {
    return this.email;
  };
  user.prototype.generateSessionId = function () {
    return jwt.sign({ id: this.id, email: this.email }, appToken, {
      expiresIn: '1h',
    });
  };
  user.prototype.validateFrd = async function (data) {
    console.log('validate 2');
    const path = 'email';
    return await uniqueValidator({
      val: data[path],
      errors: validateMap(userSchema.validate(data)),
      model: user,
      path,
      whereNot: this.id ? 'id:' + this.id : null,
    });
  };
  /**
   * static methods
   */
  user.validateFrd = async function (data) {
    console.log('validate 1');
    const path = 'email';
    return await uniqueValidator({
      val: data[path],
      errors: validateMap(userSchema.validate(data)),
      model: user,
      path,
    });
  };
  user.rememberTokenGenerate = function ({ email }) {
    return jwt.sign({ data: { email, field: 'remember_token' } }, appToken);
  };
  user.apiTokenGenerate = function ({ email }) {
    return jwt.sign({ data: { email, field: 'api_token' } }, appToken);
  };
  user.register = function ({ email, password }) {
    const data = {
      email,
      password,
      remember_token: user.rememberTokenGenerate({ email }),
      api_token: user.apiTokenGenerate({ email }),
    };
    return user.create(data);
  };
  return user;
};
