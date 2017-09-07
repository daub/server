import test from 'ava'

import {
  isMatch
} from 'lodash'

import Request from '@daub/test-router-axios'

import router from '../lib'

const request = Request(router)

test.before(Request.loadDb)

const exo = { name: 'Exo' }
const hopar = { name: 'Hopar' }

test('CRUD', async t => {
  const url = await request
    .post('/things', exo)
    .then(res => {
      const { location } = res.headers
      t.regex(location, /^\/things\/[a-f\d]{24}$/i)
      return location
    })

  await request
    .get(url)
    .then(res => {
      t.true(isMatch(res.data, exo))
    })

  await request
    .put(url, hopar)
    .then(res => {
      t.is(res.status, 204)
    })

  await request
    .get(url)
    .then(res => {
      t.true(isMatch(res.data, hopar))
    })

  await request
    .delete(url)
    .then(res => {
      t.is(res.status, 204)
    })

  await request
    .get(url)
    .then(res => t.fail())
    .catch(err => {
      t.is(err.response.status, 404)
    })
})

test('Validation', async t => {
  const validBody = {
    name: 'exo',
    url: 'http://freenet.am'
  }
  const noName = { description: 'hopar' }
  const invalidURL = { url: 'hopar' }

  const checkErrors = (...props) => err => {
    const { status, data } = err.response

    t.is(status, 422)

    props.forEach(prop => t.truthy(data[prop]))
  }

  await t.throws(request.post('/things', noName))
    .then(checkErrors('name'))

  await t.throws(request.post('/things', invalidURL))
    .then(checkErrors('name', 'url'))

  // not throws
  const location = await request.post('/things', validBody)
    .then(res => res.headers.location)

  await t.throws(request.put(location, invalidURL))
    .then(checkErrors('url'))

  // cleanup
  await request.delete(location)
})

test('List', async t => {
  await request
    .get('/things')
    .then(res => {
      t.deepEqual(res.data, [])
    })
})
