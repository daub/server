import test from 'ava'

import { MongoDBServer } from 'mongomem'

import {
  connect
} from '../lib'

import {
  Thing
} from '../lib/models'

test.before(t => MongoDBServer.start())
test.after.always(t => MongoDBServer.tearDown())

test('connect', async t => {
  const url = await MongoDBServer.getConnectionString()

  await connect(url)

  t.pass()
})

test('models', async t => {
  await Thing
    .create({ name: 'exo' })

  await Thing
    .findOne({})
    .then(doc => t.is(doc.name, 'exo'))
})
