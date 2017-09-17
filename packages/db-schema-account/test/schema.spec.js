import test from 'ava'

import mongoose from '@daub/test-mongoose'

import accountSchema from '../lib'

import { Types } from '@daub/db-schema'

test.before(mongoose.start)
test.after.always(mongoose.tearDown)

const Account = mongoose.model('Account', accountSchema)

const okEmail = 'exo@hopar.com'
const okPassword = '0KPassword'

const badEmail = '@exo'
const badPassword = 'x'

test('Register', async t => {
  const register = (email, password) => {
    return Account.create({ email, password })
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
    return Account.login({ email, password })
  }

  await t.throws(login(okEmail, badPassword))

  await t.throws(login(badEmail, okPassword))

  const p = login(okEmail, okPassword)

  await t.notThrows(p)

  await p.then(doc => {
    t.true(doc.password == null)
    t.true(doc instanceof Account)
  })

})
