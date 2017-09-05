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
  await t.throws(request.get('/private'))

  const config = { headers: { 'Token': 'x' } }
  await t.notThrows(request.get('/private', config))

  request.defaults.headers.get['Token'] = 'x'

  await t.notThrows(request.get('/private'))
})

test('interceptors', async t => {
  await t.throws(request.post('/private'))

  request.interceptors.request.use((config) => {
    config.headers.post['Token'] = 'x'
    return config
  })

  request.interceptors.response.use((response) => {
    const { data } = response
    response.data = data.toUpperCase()
    return response
  })

  await request
    .post('/private')
    .then(res => t.is(res.data, 'POST'))
})

test('tearDown', async t => {
  await t.notThrows(request.tearDown())
  await t.throws(request.tearDown())

  await t.throws(request.get('/'))
})
