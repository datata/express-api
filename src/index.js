import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'
import { dbConnection } from './config/db.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.use('/', router)

dbConnection()
  .then(() => {
    console.log('Database connected')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Error connecting to database:', error)
  })
