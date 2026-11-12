import express from 'express'
import morgan from 'morgan'
import router from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.use('/users', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
