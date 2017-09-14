import test from 'ava'

import mongoose from '@daub/test-mongoose'

import userSchema from '../lib'

import passwordSchema from '@daub/db-schema-password'

import { Types } from '@daub/db-schema'

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Password = mongoose.model('Password', passwordSchema)
const User = mongoose.model('User', userSchema)

const okEmail = 'exo@hopar.com'
const okPassword = '0KPassword'

const badEmail = '@exo'
const badPassword = 'x'

test('Register', async t => {
  const register = (email, password) => {
    return User.register({ email, password })
  }

  await t.throws(register(badEmail, okPassword))
    .then(err => {
      t.truthy(err.errors.email)
    })

  await t.throws(register(okEmail, badPassword))
    .then(err => {
      t.truthy(err.errors.password)
    })

  await t.notThrows(register(okEmail, okPassword))

  await t.throws(register(okEmail, okPassword))
    .then(err => {
      const { email } = err.errors

      t.truthy(email)
      t.is(email.reason, 'unique')
    })
})

test('Login', async t => {
  const login = (email, password) => {
    return User.login({ email, password })
  }

  await t.throws(login(okEmail, badPassword))

  await t.throws(login(badEmail, okPassword))

  await t.notThrows(login(okEmail, okPassword))

  await login(okEmail, okPassword)
    .then(doc => {
      t.true(doc instanceof User)
    })

})
