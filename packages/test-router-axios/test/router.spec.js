import test from 'ava'

import Router from 'koa-router'

import Request from '../lib'

const router = new Router()

router.get('/exo', ctx => {
  ctx.body = 'exo'
})

const request = Request(router)

test.before(Request.loadDb)

test('routes', async t => {
  await request
    .get('/exo')
    .then(res => t.is(res.data, 'exo'))

  await t.throws(request.post('/things'))
})
