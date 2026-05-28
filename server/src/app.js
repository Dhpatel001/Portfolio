const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

const { corsOrigin, nodeEnv } = require('./config/env')
const contactRoutes = require('./routes/contact')

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(
  cors({
    origin: corsOrigin,
    credentials: false,
  }),
)
app.use(express.json({ limit: '64kb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'OK' })
})

const resumePath = path.resolve(__dirname, '../../docs/dhruv_patel_resume (1).pdf')

app.get(['/resume', '/resume.pdf'], (_req, res, next) => {
  res.download(resumePath, 'Dhruv-Patel-Resume.pdf', (err) => {
    if (err) next(err)
  })
})

app.use('/api/contact', contactRoutes)

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500
  const safeMessage =
    nodeEnv === 'production' ? 'Unexpected server error' : err?.message || 'Unexpected server error'
  res.status(status).json({ message: safeMessage })
})

module.exports = app
