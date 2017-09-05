import test from 'ava'

import Axios from 'axios'
import getPort from 'get-port'

import app from '../lib'

const Request = async (app) => {
  const port = await getPort()
  const server = app.listen(port)
  const baseURL = `http://127.0.0.1:${port}/`
  return Axios.create({ baseURL })
}

test('ctx.request.body', async t => {
  const body = { name: 'exo' }

  app.use((ctx, next) => {
    if (ctx.path !== `/${t.title}`) return next()
    ctx.body = ctx.request.body
  })

  const request = await Request(app)
  const { data } = await request.post(t.title, body)

  t.deepEqual(data, body)
})

test('ctx.models', async t => {
  app.use((ctx, next) => {
    if (ctx.path !== `/${t.title}`) return next()
    ctx.body = !!ctx.models
  })

  const request = await Request(app)
  const { data } = await request.get(t.title)

  t.true(data)
})
