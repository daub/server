const http = require('http')

const config = require('config')

const db = require('./packages/db')
const app = require('./packages/app')

app.context.models = db.models
app.context.config = config.get('app')

db.connect(config.get('db.url'))

const server = http.createServer(app.callback())

const port = config.get('app.port')
server.listen(port, (err) => {
  console.log(`Server listening to port ${port}`)
})
