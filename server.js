const http = require('http')

const config = require('config')

const db = require('@daub/db')
const api = require('@daub/api')

api.context.models = db.models
api.context.config = config.get('app')

db.connect(config.get('db.url'))

const server = http.createServer(api.callback())

const port = config.get('app.port')
server.listen(port, (err) => {
  console.log(`Server listening to port ${port}`)
})
