const app = require('./app')
const db = require ('@daub/db')

app.context.models = db.models

module.exports = app
module.exports.db = db
