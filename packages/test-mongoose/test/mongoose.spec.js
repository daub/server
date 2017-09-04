import test from 'ava'

import mongoose from '../lib'

test('start', async t => {
  await mongoose.start()

  t.is(mongoose.connection.readyState, 1)
})

test('tearDown', async t => {
  await mongoose.tearDown()

  t.is(mongoose.connection.readyState, 0)
})
