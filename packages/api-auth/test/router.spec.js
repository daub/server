import test from 'ava'

import {
  isMatch
} from 'lodash'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

const { User } = request.app.context.models

const validBody = { email: 'exo@exo.com', password: 'Passw0rd' }
const invalidBody = { email: 'exo', password: 'exo' }
const invalidPass = { email: 'exo@exo.com', password: 'exo' }

test.before(async t => {
  await Request.loadDb()
})

const checkErrors = (t, code, ...props) => err => {
  const { status, data } = err.response

  t.is(status, code)

  const { errors } = data || {}

  props.forEach(prop => t.truthy(data[prop]))
}

test('Register', async t => {
  await t.throws(request.post('/auth/register', invalidBody))
    .then(checkErrors(t, 422, 'email'))

  // not throws
  await t.notThrows(request.post('/auth/register', validBody))

  await t.throws(request.post('/auth/register', validBody))
    .then(checkErrors(t, 409, 'email'))
})

test('Login', async t => {
  await t.throws(request.post('/auth/login', invalidBody))
    .then(checkErrors(t, 401))

  await t.throws(request.post('/auth/login', invalidPass))
    .then(checkErrors(t, 401))

  const login = request.post('/auth/login', validBody)

  await t.notThrows(login)

  const { status, headers, data } = await login

  t.is(status, 202)
  t.truthy(data.accessToken)
})
