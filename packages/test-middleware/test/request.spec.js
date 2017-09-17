import test from 'ava'

import Request from '../lib'

test('Request', t => {
  t.truthy(Request.app)
  t.truthy(Request.loadDb)
})

test('middleware', async t => {
  const middleware = ({ path }) => (ctx, next) => {
    if (ctx.path !== path) return next()
    ctx.body = path
  }

  const req = Request(middleware, { path: '/exo' })

  t.truthy(req.app)

  await req
    .get('/exo')
    .then(res => t.is(res.data, '/exo'))

  await t.throws(req.post('/hopar'))
})
