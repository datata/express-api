import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({
      error: 'Authorization header is required',
    })
  }

  const token = authorization.split(' ')[1]

  console.log(token)

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  req.user = {
    id: decoded.id,
    email: decoded.email,
  }

  next()
}

export default auth
