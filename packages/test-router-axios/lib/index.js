const Axios = require('axios-serve')

const app = require('@daub/api/lib/app')

const { MongoDBServer } = require('mongomem')
const db = require('@daub/db')

function Request (router) {
  app.context.models = db.models
  app.use(router.routes())

  return Axios.createServer(app.callback())
}

module.exports = Request

module.exports.loadDb = async function () {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  return db.connect(url)
}
