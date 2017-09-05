import test from 'ava'

import axios from 'axios'
import { MongoDBServer } from 'mongomem'
import getPort from 'get-port'

import app from '../lib'

let request

test.before(async t => {
  // connect db
  await MongoDBServer.start()
  await MongoDBServer
    .getConnectionString()
    .then(url => app.db.connect(url))

  const port = await getPort()
  const server = app.listen(port)

  request = axios.create({
    baseUrl: `http://localhost:${port}`
  })
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
