const mongoose = require('mongoose')

let connectPromise = null

async function connectDb(mongoUri) {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (connectPromise) {
    return connectPromise
  }

  mongoose.set('strictQuery', true)

  connectPromise = mongoose.connect(mongoUri).finally(() => {
    connectPromise = null
  })

  return connectPromise
}

module.exports = { connectDb }
