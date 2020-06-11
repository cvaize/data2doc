'use strict';

const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    DB_ENV: joi.string().allow(['production', 'test']),
    DB_DIALECT: joi.string(),
    DB_USER: joi.string(),
    DB_HOST: joi.string(),
    DB_PASSWORD: joi.string().optional().empty(''),
    DB_DATABASE: joi.string(),
    DB_PREFIX: joi.string(),
    DB_PORT: joi.number(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  database: {
    env: envVars.DB_ENV,
    username: envVars.DB_USER,
    host: envVars.DB_HOST,
    password: envVars.DB_PASSWORD,
    prefix: envVars.DB_PREFIX,
    database:
      envVars.DB_ENV === 'test'
        ? envVars.DB_DATABASE + '_test'
        : envVars.DB_DATABASE,
    port: envVars.DB_PORT,
    dialect: envVars.DB_DIALECT,
  },
};

module.exports = config;
