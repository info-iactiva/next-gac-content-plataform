// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import { connectToDatabase } from "@/lib/mongodb/mongodb";
// // import {User}  from "@/models/user";
// // import { Rol } from '@/models/rol';
// // import { Plan } from '@/models/plan';
// // import { UserPlan } from '@/models/UserPlan';
// import { User, Rol, UserPlan, Plan } from '@/models';

// export async function POST(request: Request) {
//   await connectToDatabase()
//   const { email, password } = await request.json()

//   const existingUser = await User.findOne({ email })
//   if (existingUser) {
//     return NextResponse.json({ error: 'El correo ya existe' }, { status: 400 })
//   }



//   const hashedPassword = await bcrypt.hash(password, 10)
//   const defaultRole = await Rol.findOne({ name: 'usuario' })
//   const defaultPlan = await Plan.findOne({ nombre: 'Plan Sencillo' })

//   const newUser = await User.create({ email, password: hashedPassword ,id_rol: defaultRole._id, is_active: false, used_tokens: 0 })

//   // haz que la fecha de inicio sea la fecha actual y la fecha de fin un mes despues    
//   await UserPlan.create({ id_user: newUser, id_plan: defaultPlan, start_date: new Date(), end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), active: true  })

//   return NextResponse.json({ message: 'Usuario registrado', user: { id: newUser._id, email: newUser.email } })
// }


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // 1. Verificar si ya existe el usuario
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'El correo ya existe' }, { status: 400 })
  }

  // 2. Obtener rol y plan por defecto
  const defaultRole = await prisma.rol.findUnique({
    where: { name: 'usuario' },
  })

  const defaultPlan = await prisma.plan.findUnique({
    where: { nombre: 'Plan Sencillo' },
  })

  if (!defaultRole || !defaultPlan) {
    return NextResponse.json(
      { error: 'Rol o plan por defecto no encontrados' },
      { status: 500 }
    )
  }

  // 3. Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Crear usuario
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      id_rol: defaultRole.id,
      is_active: false,
      used_tokens: 0,
    },
  })

  // 5. Crear asignación de plan con fechas
  const now = new Date()
  const oneMonthLater = new Date()
  oneMonthLater.setMonth(now.getMonth() + 1)

  await prisma.userPlan.create({
    data: {
      id_user: newUser.id,
      id_plan: defaultPlan.id,
      start_date: now,
      end_date: oneMonthLater,
      active: true,
    },
  })

  return NextResponse.json({
    message: 'Usuario registrado',
    user: { id: newUser.id, email: newUser.email },
  })
}

