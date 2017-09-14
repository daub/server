import test from 'ava'

import mongoose from '@daub/test-mongoose'

import userSchema from '../lib'

import { Types } from '@daub/db-schema'

const { ObjectId } = mongoose.Types

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Password = mongoose.model('Password', userSchema)

test('Schema', async t => {
  const owner = new ObjectId()

  const body = {
    owner,
    password: 'exoex022',
  }

  await Password.create(body)

  const doc = await Password.findOne({})

  t.truthy(doc.owner)

  t.truthy(doc.password)
  t.not(doc.password, 'exo')
})

test('Validation', async t => {
  const create = password => {
    const owner = new ObjectId()
    return Password.create({ owner, password })
  }

  await t.throws(create())
    .then(err => {
      t.truthy(err.errors.password)
    })

  await t.throws(create('exo'))
    .then(err => {
      t.truthy(err.errors.password)
    })
  //
  await t.notThrows(create('l0ngerPassw'))
})

test('Compare', async t => {
  const owner = new ObjectId()
  const password = 'h0parJan'

  const doc = await Password.create({ owner, password })

  await doc
    .compare(password)
    .then(res => t.true(res))

  await doc
    .compare('hoparjan')
    .then(res => t.false(res))
})
