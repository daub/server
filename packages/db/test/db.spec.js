import test from 'ava'

import { MongoDBServer } from 'mongomem'

import db from '../lib'

test.before(t => MongoDBServer.start())
test.after.always(t => MongoDBServer.tearDown())

test('init', t => {
  t.true(db instanceof db.Database)
  t.is(typeof db.models, 'object')
})

test('connect', async t => {
  const url = await MongoDBServer.getConnectionString()

  await db.connect(url)

  t.is(db.connection.readyState, 1)

  await db.disconnect()

  t.is(db.connection.readyState, 0)
})
