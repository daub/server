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

  await User.register(validBody)
})

test('Create', async t => {
  const checkErrors = (...props) => err => {
    const { data } = err.response
    t.is(err.response.status, 401)
    props.forEach(prop => t.truthy(data[prop]))
  }

  await t.throws(request.post('/sessions', invalidBody))
    .then(checkErrors())

  await t.throws(request.post('/sessions', invalidPass))
    .then(checkErrors())
})

test('Success', async t => {
  const login = request.post('/sessions', validBody)

  await t.notThrows(login)

  const { status, headers, data } = await login

  t.is(status, 202)
  t.truthy(headers.location)
  t.truthy(data.accessToken)
})
