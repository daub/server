import test from 'ava'

import mongoose from '@daub/test-mongoose'

import userSchema from '../lib'

import { Types } from '@daub/db-schema'

mongoose.Schema.Types.URL = Types.URL

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const User = mongoose.model('User', userSchema)

test('Schema', async t => {
  const body = {
    password: 'exo',
    email: 'exo'
  }

  await User
    .create(body)

  const doc = await User.findOne({})

  t.is(doc.email, 'exo')
})

test('Validation: email', async t => {
  const p = User.create({})
  const err = await t.throws(p)
  t.truthy(err.errors.email)
})
