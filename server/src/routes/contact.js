const express = require('express')
const rateLimit = require('express-rate-limit')

const Message = require('../models/Message')
const { contactSchema } = require('../validation/contact')

const router = express.Router()

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: parsed.error.flatten(),
      })
    }

    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.ip || ''
    const userAgent = req.headers['user-agent']?.toString() || ''

    const doc = await Message.create({ ...parsed.data, ip, userAgent })

    return res.status(201).json({ message: 'Message received', id: doc._id })
  } catch (err) {
    return next(err)
  }
})

module.exports = router

