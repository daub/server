const http = require('http')
const Axios = require('axios')
const getPort = require('get-port')

function Request (app) {
  if (!(this instanceof Request)) return new Request(app)

  this.app = app

  this.loadAxios = loadApp(app)

  return this
}

async function loadApp (app) {
  const port = await getPort()
  const server = http
    .createServer(app.callback())
    .listen(port)
  const baseURL = `http://localhost:${port}`
  return Axios.create({ baseURL })
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
