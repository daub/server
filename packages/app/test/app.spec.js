import test from 'ava'

import supertest from 'supertest'

import app from '../lib'

app.use(ctx => {
  ctx.body = 'exo'
})

let request

test.before(async t => {
  const server = app.listen(3000)
  request = supertest(server)
})

test('init', async t => {
  const res = await request.get('/')

  t.is(res.text, 'exo')
})
