const { describe, it } = require('mocha');
const chai = require('chai');
const assert = chai.assert;
chai.config.includeStack = true;

const request = require('request-promise-native');
const getApiUrl = require('../utils/getApiUrl.util');

const REGISTER_URL = getApiUrl('/register');
const LOGIN_URL = getApiUrl('/login');

const TEST_EMAIL = 'example@gmail.com';
const TEST_PASSWORD = 'example@gmail.com';

describe('Auth', function () {
  it('Register', async function () {
    const data = await request.post(REGISTER_URL, {
      json: { email: '  ' + TEST_EMAIL + '  ', password: TEST_PASSWORD },
    });
    assert.isFalse(!data.user, 'Пользователь не передан');
    assert.isFalse(!data.user.id, 'У пользователя нет ID');
    assert.isFalse(!data.sessionId, 'sessionId не передан');
    assert.equal(
      data.user.email,
      TEST_EMAIL,
      'Email не соответствует переданному',
    );
  });
  it('Login', async function () {
    const data = await request.post(LOGIN_URL, {
      json: { email: '  ' + TEST_EMAIL + '  ', password: TEST_PASSWORD },
    });
    assert.isFalse(!data.user, 'Пользователь не передан');
    assert.isFalse(!data.user.id, 'У пользователя нет ID');
    assert.isFalse(!data.sessionId, 'sessionId не передан');
    assert.equal(
      data.user.email,
      TEST_EMAIL,
      'Email не соответствует переданному',
    );
  });
});
