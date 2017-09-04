const {
  pipe,
  entries,
  map,
  apply,
  keyBy,
  bindKey
} = require('lodash/fp')

const mongoose = require('@daub/mongoose')
const schemas = require('./schemas')

const compile = bindKey(mongoose, 'model')
const build = pipe(entries, map(apply(compile)), keyBy('modelName'))

module.exports = build(schemas)
