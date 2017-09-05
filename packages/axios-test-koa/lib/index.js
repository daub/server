const http = require('http')
const Axios = require('axios')
const getPort = require('get-port')

class Request {
  constructor (app) {
    this.app = app
    this.axios = Axios.create()

    this.load = createServer(app)
      .then(server => {
        this.server = server
        this.defaults.baseURL = this.baseURL
      })

    return this
  }
  get defaults () {
    return this.axios.defaults
  }
  get interceptors () {
    return this.axios.interceptors
  }
  get baseURL () {
    if (!this.server)
      throw new Error('No server listening')

    const { port } = this.server.address()
    return `http://localhost:${port}`
  }
}

async function createServer (app) {
  const port = await getPort()
  const server = http.createServer(app.callback())
  const start = (resolve, reject) => {
    server
      .on('listening', () => resolve(server))
      .on('error', reject)
      .listen(port)
  }
  return new Promise(start)
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
  Request.prototype[name] = function (...args) {
    const { load, axios } = this
    const call = args => () => axios[name](...args)
    return load.then(call(args))
  }
})

module.exports = Request
