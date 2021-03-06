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
 * - Найти и удалить тестовых пользователей №1 и №2
 * - Зарегистрировать тестового пользователя №1 и сохранить данные для сравнения
 * - Зарегистрировать тестового пользователя №2
 * - Войти как тестовый пользователь №1 и сравнить данные отправленные после регистрации
 */

describe('Auth', function () {
  let user;
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
    user = data.user;
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
    assert.equal(
      data.user.email,
      user.email,
      'Email зарегистрированного пользователя не совпадает с Email переданным после входа',
    );
    assert.equal(
      data.user.id,
      user.id,
      'Id зарегистрированного пользователя не совпадает с Id переданным после входа',
    );
  });
});
