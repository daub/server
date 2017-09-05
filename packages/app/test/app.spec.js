import test from 'ava'

import supertest from 'supertest'

import app from '../lib'

let request

test.before(async t => {
  const server = app.listen(3000)
  request = supertest(server)
})

test('body parser', async t => {
  const data = { name: 'exo' }

  app.use(async ctx => {
    ctx.body = ctx.request.body
  })

  const res = await request
    .post('/')
    .send(data)

  t.deepEqual(res.body, data)
})
