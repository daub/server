const Axios = require('axios-serve')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { MongoDBServer } = require('mongomem')
const db = require('@daub/db')

function Request (router) {
  const app = new Koa()
  app.models = db.models
  app.use(bodyParser())
  app.use(router.routes())

  return new Axios(app.callback())
}

async function loadDb () {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  await db.connect(url)
}

module.exports = Request
