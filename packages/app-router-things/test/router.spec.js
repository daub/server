import test from 'ava'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

test.before(Request.loadDb)

test('/things', async t => {
  await request
    .get('/things')
    .then(res => t.deepEqual(res.data, []))

  await request
    .post('/things')
    .then(res => t.is(res.data, 'post'))
})

test('/things/:id', async t => {
  await request
    .get('/things/1')
    .then(res => {
      t.is(res.data, 1)
    })
})


