import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const emailSchema = z.string().trim().email('A valid email is required')
const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

const formatValidationErrors = error =>
  error.issues.map(issue => ({
    field: issue.path.join('.'),
    message: issue.message,
  }))

export const register = async (req, res) => {
  const validation = registerSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      errors: formatValidationErrors(validation.error),
    })
  }

  const { email, password } = validation.data

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
  const validation = loginSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      errors: formatValidationErrors(validation.error),
    })
  }

  const { email, password } = validation.data
  const user = await User.findOne({ email })

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
