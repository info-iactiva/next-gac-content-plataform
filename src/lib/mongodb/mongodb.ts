import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definido en el .env')
}

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true
    console.log('MongoDB conectado')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error)
    throw error
  }
}
