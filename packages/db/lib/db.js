const { Mongoose } = require('mongoose')

const timestamps = require('./plugins/timestamps')

const {
  keys,
  assign
} = Object

class Database {
  constructor (schemas, types) {
    const mongoose = new Mongoose()

    mongoose.plugin(timestamps)

    assign(mongoose.Schema.Types, types)

    this.mongoose = assign(mongoose, { Promise })

    keys(schemas).forEach(name => {
      this.model(name, schemas[name])
    })

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
