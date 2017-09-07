import test from 'ava'

import mongoose from '@daub/test-mongoose'

import thingSchema from '../lib'

import { Types } from '@daub/db-schema'

mongoose.Schema.Types.URL = Types.URL

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Thing = mongoose.model('Thing', thingSchema)

test('Schema', async t => {
  await Thing
    .create({ name: 'exo' })

  const doc = await Thing.findOne({})

  t.is(doc.name, 'exo')

  t.truthy(doc.id)

  t.truthy(doc.createdAt)
  t.truthy(doc.updatedAt)

  const ret = doc.toJSON()

  t.falsy(ret._id)
  t.truthy(ret.id)
})

test('Validation: name', async t => {
  const p = Thing.create({ description: 'hopar' })
  const err = await t.throws(p)
  t.truthy(err.errors.name)
})

test('Validation: url', async t => {
  const p = Thing.create({
    name: 'exo',
    url: 'hopar'
  })
  const err = await t.throws(p)
  t.truthy(err.errors.url)
})
