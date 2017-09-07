const { Schema } = require('mongoose')

const types = require('./types')

module.exports = Schema

module.exports.Types = Object.assign(Schema.Types, types)
