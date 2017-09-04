import test from 'ava'

import mongoose from '@daub/test-mongoose'

import thingSchema from '../lib'

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

test('Schema', async t => {
  const Thing = mongoose.model('Thing', thingSchema)

  await Thing
    .create({ name: 'exo' })

  await Thing
    .findOne({})
    .then(doc => t.is(doc.name, 'exo'))
})
