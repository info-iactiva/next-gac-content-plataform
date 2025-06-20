// import mongoose from 'mongoose'


// let MONGODB_URI = process.env.MONGODB_URI || ''
// const IS_LOCAL = process.env.LOCAL === 'True'

// if (!IS_LOCAL) {
//   MONGODB_URI = process.env.MONGO_URL_SERVER || ''
// }

// if (!MONGODB_URI) {
//   throw new Error('MONGODB_URI no está definido en el .env')
// }

// let isConnected = false

// export async function connectToDatabase() {
//   if (isConnected) return

//   try {
//     await mongoose.connect(MONGODB_URI)
//     isConnected = true
//     console.log('MongoDB conectado')
    
//   } catch (error) {
//     console.error('Error conectando a MongoDB:', error)
//     throw error
//   }
// }


// lib/mongodb.ts
import mongoose from 'mongoose';

let MONGODB_URI = process.env.MONGODB_URI || ''
const IS_LOCAL = process.env.LOCAL === 'True'

if (!IS_LOCAL) {
  MONGODB_URI = process.env.MONGO_URL_SERVER || ''
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definido en el .env')
}

let cached = global.mongoose as { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null }

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    cached.promise = null
    throw error
  }
}


