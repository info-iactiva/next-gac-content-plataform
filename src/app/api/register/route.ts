import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from "@/lib/mongodb/mongodb";
// import {User}  from "@/models/user";
// import { Rol } from '@/models/rol';
// import { Plan } from '@/models/plan';
// import { UserPlan } from '@/models/UserPlan';
import { User, Rol, UserPlan, Plan } from '@/models';

export async function POST(request: Request) {
  await connectToDatabase()
  const { email, password } = await request.json()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json({ error: 'El correo ya existe' }, { status: 400 })
  }



  const hashedPassword = await bcrypt.hash(password, 10)
  const defaultRole = await Rol.findOne({ name: 'usuario' })
  const defaultPlan = await Plan.findOne({ nombre: 'Plan Sencillo' })

  const newUser = await User.create({ email, password: hashedPassword ,id_rol: defaultRole._id, is_active: false, used_tokens: 0 })

  // haz que la fecha de inicio sea la fecha actual y la fecha de fin un mes despues    
  await UserPlan.create({ id_user: newUser, id_plan: defaultPlan, start_date: new Date(), end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), active: true  })

  return NextResponse.json({ message: 'Usuario registrado', user: { id: newUser._id, email: newUser.email } })
}
