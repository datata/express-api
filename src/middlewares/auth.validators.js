const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body ?? {}
  const errors = {}

  if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
    errors.email = 'A valid email is required'
  }

  if (typeof password !== 'string' || password.length === 0) {
    errors.password = 'Password is required'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}
