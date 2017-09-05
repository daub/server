const Database = require('./db')
const schemas = require('./schemas')


module.exports = new Database(schemas)
module.exports.Database = Database
