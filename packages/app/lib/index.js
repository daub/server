const app = require('./app')

const db = require ('@daub/db')

const thingsRouter = require('./router/things')

app.context.models = db.models

app.use(thingsRouter.routes())

module.exports = app
module.exports.db = db
