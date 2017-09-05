import test from 'ava'

import Request from '../lib'

import Koa from 'koa'

const app = new Koa()

app.use(ctx => {
  const { method } = ctx.request
  ctx.body = method.toLowerCase()
})

const request = Request(app)

test('get, post', async t => {
  await request
    .get('/')
    .then(res => t.is(res.data, 'get'))

  await request
    .post('/')
    .then(res => t.is(res.data, 'post'))
})

