const Axios = require('axios-serve')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { MongoDBServer } = require('mongomem')
const db = require('@daub/db')

function Request (router) {
  const app = new Koa()
  app.context.models = db.models
  app.use(bodyParser())
  app.use(router.routes())

  return Axios.createServer(app.callback())
}

module.exports = Request

module.exports.loadDb = async function (){
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  return db.connect(url)
}

