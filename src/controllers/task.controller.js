import mongoose from 'mongoose'
import Task from '../models/task.model.js'

const validateTaskInput = (body, { partial = false } = {}) => {
  const errors = {}
  const input = body && typeof body === 'object' && !Array.isArray(body) ? body : {}

  if (!partial || Object.hasOwn(input, 'title')) {
    if (typeof input.title !== 'string' || !input.title.trim()) {
      errors.title = 'Title is required'
    } else if (input.title.trim().length > 120) {
      errors.title = 'Title must be 120 characters or fewer'
    }
  }

  if (Object.hasOwn(input, 'description') && typeof input.description !== 'string') {
    errors.description = 'Description must be a string'
  }

  if (Object.hasOwn(input, 'completed') && typeof input.completed !== 'boolean') {
    errors.completed = 'Completed must be a boolean'
  }

  if (partial && !['title', 'description', 'completed'].some(key => Object.hasOwn(input, key))) {
    errors.body = 'At least one task field must be provided'
  }

  return { errors, input }
}

const validateTaskId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid task id' })
    return false
  }

  return true
}

export const listTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })
  return res.json({ data: tasks })
}

export const getTask = async (req, res) => {
  if (!validateTaskId(req.params.id, res)) return

  const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
  if (!task) return res.status(404).json({ error: 'Task not found' })

  return res.json({ data: task })
}

export const createTask = async (req, res) => {
  const { errors, input } = validateTaskInput(req.body)
  if (Object.keys(errors).length) return res.status(400).json({ errors })

  const task = await Task.create({
    title: input.title,
    description: input.description,
    completed: input.completed,
    user: req.user.id,
  })

  return res.status(201).json({ data: task })
}

export const updateTask = async (req, res) => {
  if (!validateTaskId(req.params.id, res)) return

  const { errors, input } = validateTaskInput(req.body, { partial: true })
  if (Object.keys(errors).length) return res.status(400).json({ errors })

  const updates = Object.fromEntries(
    ['title', 'description', 'completed']
      .filter(key => Object.hasOwn(input, key))
      .map(key => [key, key === 'title' ? input[key].trim() : input[key]]),
  )

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    updates,
    { new: true, runValidators: true },
  )
  if (!task) return res.status(404).json({ error: 'Task not found' })

  return res.json({ data: task })
}

export const deleteTask = async (req, res) => {
  if (!validateTaskId(req.params.id, res)) return

  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
  if (!task) return res.status(404).json({ error: 'Task not found' })

  return res.status(204).end()
}
