const app = require('./app')

const thingsRouter = require('@daub/app-router-things')

app.use(thingsRouter.routes())

module.exports = app
