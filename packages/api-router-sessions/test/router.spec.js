import test from 'ava'

import {
  isMatch
} from 'lodash'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

test.before(Request.loadDb)

test('Create', async t => {
  const validBody = { email: 'exo@exo.com', password: 'Passw0rd' }
  const invalidBody = { email: 'exo', password: 'exo' }
  const invalidPass = { email: 'exo@exo.com', password: 'exo' }

  const { User } = request.app.context.models

  await User.register(validBody)

  const checkErrors = (status, ...props) => err => {
    const { data } = err.response

    t.is(err.response.status, status)

    props.forEach(prop => t.truthy(data[prop]))
  }

  await t.throws(request.post('/sessions', invalidBody))
    .then(checkErrors(401))

  await t.throws(request.post('/sessions', invalidPass))
    .then(checkErrors(401))

  // not throws
  await t.notThrows(request.post('/sessions', validBody))
})
