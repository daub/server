import test from 'ava'

import Request from '../lib'

import Koa from 'koa'

const app = new Koa()

app.use((ctx, next) => {
  if (ctx.path !== '/private') return next()

  if (ctx.request.headers['token']) return next()

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
  await request
    .get('/private')
    .catch(err => t.is(err.response.status, 401))

  await request
    .get('/private', {
      headers: { 'Token': 'xxx' }
    })
    .then(res => t.is(res.data, 'get'))

  request.defaults.headers.get['Token'] = 'xxx'

  await request
    .get('/private')
    .then(res => t.is(res.data, 'get'))

  await request
    .post('/private')
    .catch(err => t.is(err.response.status, 401))
})
