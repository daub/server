const http = require('http')

const config = require('config')

const app = require('./packages/server')

const server = http.createServer(app.callback())

const port = config.get('app.port')
server.listen(port, (err) => {
  console.log(`Server listening to port ${port}`)
})
