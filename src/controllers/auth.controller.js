import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

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

export const login = (req, res) => {
  res.json('Usuario logueado')
}
