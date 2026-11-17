import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from '../controllers/task.controller.js'

const router = express.Router()

router.use(authenticate)

router.get('/', listTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
