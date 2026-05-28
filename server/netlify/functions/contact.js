const { randomUUID } = require('crypto')
const { getStore } = require('@netlify/blobs')
const { contactSchema } = require('../../src/validation/contact')

function json(statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Method not allowed' }, { allow: 'POST' })
  }

  let payload
  try {
    payload = event.body ? JSON.parse(event.body) : {}
  } catch {
    return json(400, { message: 'Invalid JSON payload' })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return json(400, {
      message: 'Invalid input',
      errors: parsed.error.flatten(),
    })
  }

  const store = getStore({ name: 'contact-messages', consistency: 'strong' })
  const ip =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    ''
  const userAgent = event.headers['user-agent'] || ''
  const now = new Date().toISOString()
  const id = `${now}-${randomUUID()}`

  await store.setJSON(id, {
    id,
    ...parsed.data,
    ip,
    userAgent,
    createdAt: now,
  })

  return json(201, { message: 'Message received', id })
}
