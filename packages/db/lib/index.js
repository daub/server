const { Mongoose } = require('mongoose')

const schemas = require('./schemas')

const {
  keys,
  assign
} = Object

class Database {
  constructor (schemas) {
    const mongoose = new Mongoose()

    keys(schemas).forEach(name => {
      mongoose.model(name, schemas[name])
    })

    this.mongoose = assign(mongoose, { Promise })
  }
  get models () {
    return this.mongoose.models
  }
  get connection () {
    return this.mongoose.connection
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

module.exports = new Database(schemas)
module.exports.Database = Database
