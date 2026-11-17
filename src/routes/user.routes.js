import express from 'express'
import {
  createUser,
  deleteUser,
  getProfile,
  getUsers,
  updateUser,
} from '../controllers/user.controller.js'
import authenticate from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/profile', authenticate, getProfile)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
