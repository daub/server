const Axios = require('axios-serve')

const app = require('@daub/server')

const { MongoDBServer } = require('mongomem')

function Request (middleware, options) {
  app.use(middleware(options))

  const axios = Axios.createServer(app.callback())

  axios.app = app

  return axios
}

Request.app = app

Request.loadDb = async () => {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  return app.db.connect(url)
}

module.exports = Request
