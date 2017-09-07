const { Schema } = require('mongoose')

const types = require('./types')

Object.assign(Schema.Types, types)

module.exports = Schema
