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
 * TODO: Для пользователя без подписки ограничить объем документов до общего размера не больше 500kb
 * TODO: Сделать много уровневую подписку, для первого уровня подписки общий размер не больше 1мб
 * Сценарий тестирования:
 * - Войти как тестовый пользователь №1
 * - Добавить документ тестового пользователя №1
 * - Выгрузить документ тестового пользователя №1 и сравнить с оригиналом
 * - Удалить документ тестового пользователя №1
 * - Удалить несуществующий документ
 * - Добавить превышающий по объему документ размером >500kb и <1mb
 * - Изменить уровень подписки на 1 и загрузить документ размером >500kb и <1mb
 * - Войти как тестовый пользователь №2 и попытаться получить документ пользователя №1
 * - Войти как тестовый пользователь №2 и попытаться сгенерировать документ пользователя №1
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
