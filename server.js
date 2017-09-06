const config = require('config')

const db = require('./packages/db')
const app = require('./packages/app')

app.context.models = db.models
app.context.config = config

db.connect(config.get('db.url'))

app.listen(config.get('app.port'))
