const db = require('./packages/db')
const app = require('./packages/app')

db.connect('mongodb://localhost/app')

app.listen(3000)
