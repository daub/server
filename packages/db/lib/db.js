const { Mongoose } = require('mongoose')

const timestamps = require('./plugins/timestamps')

const {
  keys,
  assign
} = Object

class Database {
  constructor () {
    const mongoose = new Mongoose()

    mongoose.plugin(timestamps)

    this.mongoose = assign(mongoose, { Promise })
  }
  get models () {
    return this.mongoose.models
  }
  get connection () {
    return this.mongoose.connection
  }
  model (name, schema) {
    this.mongoose.model(name, schema)
  }
  import (schemas, types) {
    assign(this.mongoose.Schema.Types, types)

    keys(schemas).forEach(name => {
      this.model(name, schemas[name])
    })

    return this
  }
  connect (url) {
    const options = {
      useMongoClient: true,
      promiseLibrary: Promise
    }
    return this.mongoose
      .connect(url, options)
      .then(() => this)
  }
  disconnect () {
    return this.mongoose
      .disconnect()
      .then(() => this)
  }
}

module.exports = Database
