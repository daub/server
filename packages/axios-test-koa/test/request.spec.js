import test from 'ava'

import Request from '../lib'

import Koa from 'koa'

const app = new Koa()

app.use((ctx, next) => {
  if (!ctx.request.headers['x-block']) return next()

  ctx.throw(401)
})

app.use(ctx => {
  const { method } = ctx.request
  ctx.body = method.toLowerCase()
})

const request = new Request(app)

test('methods', async t => {
  await request
    .get('/')
    .then(res => t.is(res.data, 'get'))

  await request
    .post('/')
    .then(res => t.is(res.data, 'post'))
})

test('defaults', async t => {
  request.defaults.headers.common['X-Block'] = 'Always'

  await request
    .get('/')
    .catch(err => t.is(err.response.status, 401))
})
