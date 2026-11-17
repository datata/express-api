import User from '../models/user.model.js'

export const getUsers = (req, res) => {
  res.json('Todos los usuarios')
}

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  return res.json({
    data: {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  })
}

export const createUser = (req, res) => {
  console.log(req.body)
  res.status(201).json('Usuario creado')
}

export const updateUser = (req, res) => {
  console.log(req.params.id)

  res.json('Usuario actualizado')
}

export const deleteUser = (req, res) => {
  console.log(req.params.id)

  res.json('usuario eliminado')
}
