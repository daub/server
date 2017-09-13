import test from 'ava'

import mongoose from '@daub/test-mongoose'

import userSchema from '../lib'

import { Types } from '@daub/db-schema'

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Password = mongoose.model('Password', userSchema)

test('Schema', async t => {
  const body = {
    password: 'exo',
  }

  await Password.create(body)

  const doc = await Password.findOne({})

  t.truthy(doc.password)
  t.not(doc.password, 'exo')
})

test.only('Validation', async t => {
  const create = password => {
    return Password.create({ password })
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
