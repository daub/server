import test from 'ava'

import {
  isMatch
} from 'lodash'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

test.before(Request.loadDb)

test('Create and read', async t => {
  const body = { name: 'Exo' }

  const location = await request
    .post('/things', body)
    .then(res => res.headers.location)

  t.regex(location, /^\/things\/[a-f\d]{24}$/i)

  const data = await request
    .get(location)
    .then(res => res.data)

  t.true(isMatch(data, body))
})

test('List and remove', async t => {
  const [{ _id: id }] = await request
    .get('/things')
    .then(res => {
      const { data } = res

      t.is(data.length, 1)
      return data
    })

  await request
    .delete(`/things/${id}`)
    .then(res => {
      t.is(res.status, 204)
    })

  await request
    .get('/things')
    .then(res => {
      t.is(res.data.length, 0)
    })
})
