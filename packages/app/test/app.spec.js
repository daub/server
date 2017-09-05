import test from 'ava'

import axios from 'axios'
import { MongoDBServer } from 'mongomem'
import getPort from 'get-port'

import app from '../lib'

// dirty for reasons
use('/body-parser', ctx => ctx.body = ctx.request.body)
use('/ctx-models', ctx => ctx.body = !!ctx.models)

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
    baseURL: `http://127.0.0.1:${port}`
  })
})

test('body parser', async t => {
  const body = { name: 'exo' }

  const { data } = await request
    .post('/body-parser', body)

  t.deepEqual(data, body)
})

test('ctx models', async t => {
  const { data } = await request
    .get('/ctx-models')

  t.true(data)
})

function use (path, fn) {
  return app.use((ctx, next) => {
    if (ctx.path !== path) return next()
    return fn(ctx, next)
  })
}
