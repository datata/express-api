import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/datata')
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error.message}`)
  }
}
