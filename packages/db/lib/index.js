const { Types } = require('@daub/db-schema')

const Database = require('./db')

const schemas = require('./schemas')

module.exports = new Database(schemas, Types)

module.exports.Database = Database
