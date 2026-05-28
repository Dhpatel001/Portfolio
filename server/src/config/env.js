const dotenv = require('dotenv')

dotenv.config()

function required(name) {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is required`)
  return v
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: required('MONGODB_URI'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  smtp: process.env.SMTP_HOST
    ? {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        to: process.env.SMTP_TO || '',
      }
    : null,
}

