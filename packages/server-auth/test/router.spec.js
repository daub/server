import test from 'ava'

import Router from 'koa-router'

import Request from '@daub/test-middleware'

import auth from '../lib'

const options = { db: Request.app.db }

const request = Request(auth, options)

const { context } = request.app

context.config = {
  jwt: {
    secret: 'hopar'
  }
}

const { User } = context.models

const tokens = { invalid: 'x' }

const bodies = {
  valid: {
    email: 'exo@exo.com',
    password: 'Passw0rd'
  },
  invalidEmail: {
    email: '@exo',
    password: 'Passw0rd'
  },
  invalidPassword: {
    email: 'exo@exo.com',
    password: 'x'
  }
}

const checkErrors = (t, code, ...props) => err => {
  const { status, data } = err.response
  t.is(status, code)
  const { errors } = data || {}
  props.forEach(prop => t.truthy(data[prop]))
}

test.before(Request.loadDb)

test('Register', async t => {
  await t.throws(request.post('/auth/register', bodies.invalidEmail))
    .then(checkErrors(t, 422, 'email'))

  await t.notThrows(request.post('/auth/register', bodies.valid))

  await t.throws(request.post('/auth/register', bodies.valid))
    .then(checkErrors(t, 409, 'email'))
})

test('Login', async t => {
  await t.throws(request.post('/auth/login', bodies.invalidEmail))
    .then(checkErrors(t, 401))

  await t.throws(request.post('/auth/login', bodies.invalidPassword))
    .then(checkErrors(t, 401))

  tokens.valid = await request.post('/auth/login', bodies.valid)
    .then(res => {
      t.is(res.status, 202)

      const { accessToken } = res.data
      t.true(typeof accessToken === 'string')
      return accessToken
    })
})

test('Verify', async t => {
  await t.throws(request.get('/auth/verify'))
    .then(checkErrors(t, 401))

  const headers = {
    'Authorization': `Bearer ${tokens.valid}`
  }

  await request.get('/auth/verify', { headers })
    .then(res => {
      t.is(res.status, 204)
      t.truthy(res.headers.link)
    })
})
