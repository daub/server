import test from 'ava'

import Koa from 'koa'

import Axios from 'axios-serve'

import linker from '../lib'

test('basic', async t => {
  const app = new Koa()

  app.use(linker())

  app.use(ctx => {
    ctx.response.links.exo = 'hopar'

    t.deepEqual(ctx.response.links.exo, {
      rel: 'exo',
      url: 'hopar'
    })

    ctx.body = 'hopar'
  })

  const req = Axios.createServer(app.callback())

  const res = await req.get('/')

  t.is(res.headers.link, '<hopar>; rel="exo"')
})

test('set', async t => {
  const app = new Koa()

  app.use(linker())

  app.use(ctx => {
    ctx.response.links.venus = 'test'

    ctx.response.links = {
      exo: 'hopar',
      abigail: 'nyx'
    }

    delete ctx.response.links.abigail

    t.deepEqual(ctx.response.links.exo, {
      rel: 'exo',
      url: 'hopar'
    })

    ctx.body = 'hopar'
  })

  const req = Axios.createServer(app.callback())

  const res = await req.get('/')

  t.is(res.headers.link, '<hopar>; rel="exo"')
})
