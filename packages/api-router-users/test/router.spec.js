import test from 'ava'

import {
  isMatch
} from 'lodash'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

test.before(Request.loadDb)

test('Validation', async t => {
  const validBody = { email: 'exo@exo.com', password: 'Passw0rd' }
  const invalidBody = { email: 'exo', password: 'exo' }

  const checkErrors = (status, ...props) => err => {
    const { data } = err.response

    t.is(err.response.status, status)

    props.forEach(prop => t.truthy(data[prop]))
  }

  await t.throws(request.post('/users', invalidBody))
    .then(checkErrors(422, 'email'))

  // not throws
  await t.notThrows(request.post('/users', validBody))

  await t.throws(request.post('/users', validBody))
    .then(checkErrors(409, 'email'))
})
