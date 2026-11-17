import express from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { validateLogin } from '../middlewares/auth.validators.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', validateLogin, login)

export default router
