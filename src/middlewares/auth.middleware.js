import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Authentication is not configured' })
  }

  const authorization = req.headers.authorization
  const [scheme, token] = authorization?.split(' ') ?? []

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authentication token required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    })

    if (typeof payload === 'string' || !payload.id || !payload.email) {
      return res.status(401).json({ error: 'Invalid authentication token' })
    }

    req.user = {
      id: payload.id,
      email: payload.email,
    }

    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired authentication token' })
  }
}

export default authenticate
