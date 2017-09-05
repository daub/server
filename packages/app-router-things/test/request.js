const Axios = require('axios')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const getPort = require('get-port')
const { MongoDBServer } = require('mongomem')
const db = require('@daub/db')

function Request (router) {
  if (!(this instanceof Request)) return new Request(router)

  const app = new Koa()
  app.models = db.models
  app.use(bodyParser())
  app.use(router.routes())

  this.app = app

  this.loadAxios = loadDb()
    .then(() => loadApp(app))

  return this
}

async function loadApp (app) {
  const port = await getPort()
  const server = app.listen(port)
  const baseURL = `http://localhost:${port}`
  return Axios.create({ baseURL })
}

async function loadDb () {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  await db.connect(url)
}

const methods = [
  'request',
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch'
]

methods.forEach(name => {
  const call = args => axios => axios[name](...args)
  Request.prototype[name] = function (...args) {
    return this.loadAxios.then(call(args))
  }
})

module.exports = Request
