import test from 'ava'

import { MongoDBServer } from 'mongomem'

import Db from '../lib'

test.before(t => MongoDBServer.start())
test.after.always(t => MongoDBServer.tearDown())

test('init', t => {
  const db = new Db()

  t.true(db instanceof Db)
  t.is(typeof db.models, 'object')
})

test('connect', async t => {
  const url = await MongoDBServer.getConnectionString()

  const db = new Db()

  await db.connect(url)

  t.is(db.connection.readyState, 1)

  await db.disconnect()

  t.is(db.connection.readyState, 0)
})
