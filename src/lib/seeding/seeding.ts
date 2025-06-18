// // import { Plan } from '../../models/plan';
// // import { Rol } from '../../models/rol';
// const { Plan } = require('../../models/plan');
// const { Rol } = require('../../models/rol');

import { Plan } from "@/models/plan";
import { Rol } from "@/models/rol";


//  async function seedData(): Promise<void> {
//   // Seed roles
//   const existingRoles = await Rol.countDocuments();
//   if (existingRoles === 0) {
//     await Rol.insertMany([
//       { name: 'admin' },
//       { name: 'usuario' },
//       { name: 'invitado' },
//     ]);
//     console.log('Roles iniciales insertados');
//   }

//   // Seed planes
//   const existingPlans = await Plan.countDocuments();
//   if (existingPlans === 0) {
//     await Plan.insertMany([
//       { tokens: 30, ilimit_tokesn: false, price: 9.99, duration: '1 mes', nombre: 'Plan Sencillo' },
//       { tokens: 0, ilimit_tokesn: true, price: 19.99, duration: '1 mese', nombre: 'Plan Premium' },      
//     ]);
//     console.log('Planes iniciales insertados');
//   }
// }

// module.exports = { seedData };



export async function seedData(): Promise<void> {
  const existingRoles = await Rol.countDocuments();
  if (existingRoles === 0) {
    await Rol.insertMany([
      { name: 'admin' },
      { name: 'usuario' },
      { name: 'invitado' },
    ]);
    console.log('✅ Roles insertados');
  }

  const existingPlans = await Plan.countDocuments();
  if (existingPlans === 0) {
    await Plan.insertMany([
            { tokens: 30, ilimit_tokesn: false, price: 9.99, duration: '1 mes', nombre: 'Plan Sencillo' },
      { tokens: 0, ilimit_tokesn: true, price: 19.99, duration: '1 mes', nombre: 'Plan Premium' },      
    ]);
    console.log('✅ Planes insertados');
  }
}

