import test from 'ava'

import { MongoDBServer } from 'mongomem'

import mongoose from '../lib'

test.before(t => MongoDBServer.start())
test.after.always(t => MongoDBServer.tearDown())

test('mongoose', async t => {
  const url = await MongoDBServer.getConnectionString()

  await mongoose.connect(url, { useMongoClient: true })

  t.pass()
})
