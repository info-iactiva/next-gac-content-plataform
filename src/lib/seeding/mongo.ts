import mongoose from 'mongoose';
import { seedData } from './seeding';

let MONGODB_URI = process.env.MONGODB_URI || '';
const IS_LOCAL = process.env.LOCAL === 'True';

if (!IS_LOCAL) {
  MONGODB_URI = process.env.MONGO_URL_SERVER || '';
}


if (IS_LOCAL) {
  console.log('🌍 Conectando a MongoDB en modo local');
}



if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definido en el .env');
}

export async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    await seedData();

    await mongoose.disconnect();
    console.log('✅ Seed finalizado y desconectado');
    return '✅ Seed finalizado y desconectado'
  } catch (error) {
    console.error('❌ Error ejecutando el seed:', error);
    return {'❌ Error ejecutando el seed:': error}
    process.exit(1);
    
  }
}

