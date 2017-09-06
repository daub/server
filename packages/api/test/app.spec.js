import test from 'ava'

import Axios from 'axios-serve'

import { MongoDBServer } from 'mongomem'

import db from '@daub/db'

import app from '../lib'

app.context.models = db.models

test.before(async () => {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  await db.connect(url)
})

test('ctx.request.body', async t => {
  const body = { name: 'exo' }

  app.use((ctx, next) => {
    if (ctx.path !== `/${t.title}`) return next()
    ctx.body = ctx.request.body
  })

  const request = Axios.createServer(app.callback())
  const { data } = await request.post(t.title, body)

  t.deepEqual(data, body)
})

test('/things', async t => {
  const request = Axios.createServer(app.callback())

  await request
    .get('/things')
    .then(res => t.pass())
})
