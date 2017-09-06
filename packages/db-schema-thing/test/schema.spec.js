import test from 'ava'

import mongoose from '@daub/test-mongoose'

import thingSchema from '../lib'

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Thing = mongoose.model('Thing', thingSchema)

test('Schema', async t => {
  await Thing
    .create({ name: 'exo' })

  await Thing
    .findOne({})
    .then(doc => t.is(doc.name, 'exo'))
})

test('Validation: name', async t => {
  const p = Thing.create({ description: 'hopar' })
  const err = await t.throws(p)
  t.truthy(err.errors.name)
})

test('Validation: url', async t => {
  const p = Thing.create({ url: '/hopar' })
  const err = await t.throws(p)
  t.truthy(err.errors.url)
})
