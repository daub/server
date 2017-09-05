const { MongoDBServer } = require('mongomem')

const mongoose = require('mongoose')

mongoose.Promise = Promise

module.exports = mongoose

module.exports.start = async () => {
  await MongoDBServer.start()
  const url = await MongoDBServer.getConnectionString()
  return mongoose.connect(url, {
    useMongoClient: true
  })
}

module.exports.tearDown = async () => {
  await mongoose.disconnect()
  return MongoDBServer.tearDown()
}
