import test from 'ava'

import Request from './request'

import router from '../lib'

const request = Request(router)

test('/things', async t => {
  await request
    .get('/things')
    .then(res => t.is(res.data, 'get'))

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


