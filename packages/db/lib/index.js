const { defaults } = require('lodash/fp')

const mongoose = require('@daub/mongoose')

const config = defaults({ useMongoClient: true })

module.exports.connect = (url, options) =>
  mongoose.connect(url, config(options))

module.exports.models = require('./models')
