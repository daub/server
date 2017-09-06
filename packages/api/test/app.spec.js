import test from 'ava'

import Axios from 'axios-serve'

import app from '../lib'

test('no models', async t => {
  const request = Axios.createServer(app.callback())

  await t.throws(request.get('/no-page'), /(.*) 501$/)
})

test('/', async t => {
  app.context.models = {}

  const request = Axios.createServer(app.callback())

  await t.throws(request.get('/no-page'), /(.*) 404/)
})
