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

test.only('Validation: email', async t => {
  const create = email => {
    const password = 'asdasd11'
    return User.create({ email, password })
  }

  await t.throws(create())
    .then(err => {
      // console.log(err.errors.email)
      t.truthy(err.errors.email)
    })

  await t.throws(create('exo'))
    .then(err => {
      // console.log(err.errors.email)
      t.truthy(err.errors.email)
    })

  await t.notThrows(create('exo@Exo.com'))

  await t.throws(create('EXO@exo.com'))
    .then(err => {
      t.truthy(err.errors.email)
      t.is(err.errors.email.reason, 'unique')
    })
})
