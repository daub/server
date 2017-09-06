const db = require('./packages/db')
const app = require('./packages/app')

app.context.models = db.models

db.connect('mongodb://localhost/app')

app.listen(3000)
