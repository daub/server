const http = require('http')

const db = require('@daub/db')

const app = require('./app')

app.db = db
app.context.models = db.models

app.context.config = {}

module.exports = app
