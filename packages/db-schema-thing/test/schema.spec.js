import test from 'ava'

import { MongoDBServer } from 'mongomem'
import mongoose from '@daub/mongoose'

import thingSchema from '../lib'

test.before(async t => {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  return mongoose.connect(url)
})

test.after.always(t => MongoDBServer.tearDown())

test('Schema', async t => {
  const Thing = mongoose.model('Thing', thingSchema)

  await Thing
    .create({ name: 'exo' })

  await Thing
    .findOne({})
    .then(doc => t.is(doc.name, 'exo'))
})
