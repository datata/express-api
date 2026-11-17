import User from '../models/user.model.js'

export const getUsers = (req, res) => {
  res.json('Todos los usuarios')
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

export const getUserProfile = async (req, res) => {
  const user = await User.find({ email: req.user.email })

  res.json(user)
}
