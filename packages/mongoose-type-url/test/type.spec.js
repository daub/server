import test from 'ava'

import mongoose from 'mongoose'

import URL from '../lib'

const { Schema } = mongoose

Schema.Types.URL = URL

const schema = new Schema({
  url: { type: URL }
})

const Model = mongoose.model('Link', schema)

test('Valid', async t => {
  const valid = new Model({ url: 'http://google.com' })
  await t.notThrows(valid.validate())
  t.is(valid.url, 'http://google.com/')
})

test('Invlaid', async t => {
  const invalid = new Model({ url: 'v' })
  const err = await t.throws(invalid.validate())
  t.truthy(err.errors.url)
})
