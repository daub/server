import test from 'ava'

import supertest from 'supertest'

import app from '../lib'

let request

test.before(async t => {
  const server = app.listen(3000)
  request = supertest(server)
})

test('bodyparser', async t => {
  const data = { name: 'exo' }

  use(t, ctx => {
    ctx.body = ctx.request.body
  })

  const res = await request
    .post('/bodyparser')
    .send(data)

  t.deepEqual(res.body, data)
})

test('ctx.models', async t => {
  use(t, ctx => {
    t.truthy(ctx.models)
  })

  await request.get(`/${t.title}`)
})

function use (t, fn) {
  return app.use((ctx, next) => {
    if (ctx.path !== `/${t.title}`) return next()
    return fn(ctx, next)
  })
}
