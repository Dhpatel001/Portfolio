const app = require('./app')
const { connectDb } = require('./config/db')
const { mongoUri, port } = require('./config/env')

async function start() {
  await connectDb(mongoUri)
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`)
  })
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

