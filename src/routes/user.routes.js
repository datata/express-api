import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Todos los usuarios')
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.status(201).json('Usuario creado')
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)

  res.json('Usuario actualizado')
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id)

  res.json('usuario eliminado')
})

export default router
