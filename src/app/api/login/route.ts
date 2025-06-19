import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from "@/lib/mongodb/mongodb";
// import {User}  from "@/models/user";
import {IRol} from "@/models/rol";
// import { UserPlan } from '@/models/UserPlan'
import { IPlan } from '@/models/plan'
// import { Rol } from '@/models/rol';
import { User, Rol, UserPlan, Plan } from '@/models';

const SECRET = process.env.JWT_SECRET!

// export async function POST(request: Request) {  
//   await connectToDatabase()
//   const { email, password } = await request.json()
  
//   const user = await User.findOne({ email }).populate('id_rol');

//   if (!user) {
//     return NextResponse.json({ error: 'Correo no encontrado' }, { status: 404 })
//   }
//   if (!(await bcrypt.compare(password, user.password))) {
//     return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
//   }
//   console.log("user id", user._id)
//   const userPlan = await UserPlan.findOne({ id_user: user._id, active: true }).populate('id_plan');
  
//   console.log("userPlan", userPlan)
//   const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1d' })

//   return NextResponse.json({ token, user: { id: user._id, is_active: user.is_active, rol: (user.id_rol as IRol).name,  plan: userPlan ? (userPlan.id_plan as IPlan).nombre : null,}})

// }


export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await request.json();

    const user = await User.findOne({ email }).populate('id_rol')
    if (!user) {
      return NextResponse.json({ error: 'Correo no encontrado' }, { status: 404 });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }    

    const userPlan = await UserPlan.findOne({ id_user: user._id, active: true }).populate('id_plan');

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1d' });

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        is_active: user.is_active,
        rol: (user.id_rol as IRol).name,
        plan: userPlan ? (userPlan.id_plan as IPlan).nombre : null,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}