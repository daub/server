import test from 'ava'

import Koa from 'koa'

import Axios from 'axios-serve'

import linker from '../lib'

test('basic', async t => {
  const app = new Koa()

  app.use(linker())

  app.use(ctx => {
    ctx.links.exo = 'hopar'

    t.deepEqual(ctx.links.exo, {
      rel: 'exo',
      url: 'hopar'
    })

    ctx.body = 'hopar'
  })

  const req = Axios.createServer(app.callback())

  const res = await req.get('/')

  t.is(res.headers.link, '<hopar>; rel="exo"')
})

test('set/delete', async t => {
  const app = new Koa()

  app.use(linker())

  app.use(ctx => {
    ctx.links.venus = 'test'

    ctx.links = {
      exo: 'hopar',
      abigail: 'nyx'
    }

    delete ctx.links.abigail

    t.deepEqual(ctx.links.exo, {
      rel: 'exo',
      url: 'hopar'
    })

    ctx.body = 'hopar'
  })

  const req = Axios.createServer(app.callback())

  const res = await req.get('/')

  t.is(res.headers.link, '<hopar>; rel="exo"')
})
