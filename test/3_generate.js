const { describe, it } = require('mocha');
const { test } = require('../config');
const chai = require('chai');
const assert = chai.assert;
chai.config.includeStack = true;

const request = require('request-promise-native');
const getApiUrl = require('../utils/getApiUrl.util');

const REGISTER_URL = getApiUrl('/register');
const LOGIN_URL = getApiUrl('/login');

const email = '  ' + test.user.email + '  ';
const password = '  ' + test.user.email + '  ';

/**
 * Сценарий тестирования:
 * 1) Войти как тестовый пользователь
 * 2) Отправить тестовые дынные
 */

describe('Auth', function () {
  it('Register', async function () {
    const data = await request.post(REGISTER_URL, {
      json: {
        email,
        password,
      },
    });
    assert.isFalse(!data.user, 'Пользователь не передан');
    assert.isFalse(!data.user.id, 'У пользователя нет ID');
    assert.isFalse(!data.jwt, 'jwt не передан');
    assert.equal(
      data.user.email,
      email.trim(),
      'Email не соответствует переданному',
    );
  });
  it('Login', async function () {
    const data = await request.post(LOGIN_URL, {
      json: {
        email,
        password,
      },
    });
    assert.isFalse(!data.user, 'Пользователь не передан');
    assert.isFalse(!data.user.id, 'У пользователя нет ID');
    assert.isFalse(!data.jwt, 'jwt не передан');
    assert.equal(
      data.user.email,
      email.trim(),
      'Email не соответствует переданному',
    );
  });
});
