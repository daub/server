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

test('/things', async t => {
  const request = await Request(app)

  await request
    .get('/things')
    .then(res => t.is(res.data, 'get'))

  await request
    .post('/things')
    .then(res => t.is(res.data, 'post'))
})

test('/things/:id', async t => {
  const request = await Request(app)

  await request
    .get('/things/1')
    .then(res => {
      t.is(res.data, 1)
    })
})


