const { z } = require('zod')

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(10).max(2000),
})

module.exports = { contactSchema }

