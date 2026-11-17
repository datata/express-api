import express from 'express'
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserProfile,
} from '../controllers/user.controller.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/profile', auth, getUserProfile)

export default router
