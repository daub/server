import test from 'ava'

import Axios from 'axios-serve'

import app from '../lib'

app.use((ctx, next) => {
  if (ctx.path !== '/page') return next()

  ctx.links.root = '/'
  ctx.body = 'page'
})

test('misc', async t => {
  const req = Axios.createServer(app.callback())

  await t.throws(req.get('/no-page'), /(.*) 404$/)

  const res = await req.get('/page')

  t.is(res.data, 'page')
  t.truthy(res.headers.link)
})
