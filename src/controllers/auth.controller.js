import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    })
  }

  const passwordHashed = bcrypt.hashSync(password, 10)
  const user = await User.create({
    email,
    password: passwordHashed,
  })

  res.status(201).json({
    message: 'User registered',
    data: {
      email: user.email,
      id: user._id,
    },
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email.trim() })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      error: 'Invalid email or password',
    })
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required')
  }

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email },
    secret,
    { expiresIn: '1h' },
  )

  return res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  })
}
