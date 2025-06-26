// import { connectToDatabase } from "@/lib/mongodb/mongodb";
// import { NextResponse } from 'next/server'
// import { User, Rol } from '@/models'
// import bcrypt from 'bcryptjs' // para encriptar password


// export async function GET(request: Request) {
//   await connectToDatabase()

//   // Obtener el rol admin
//   const adminRol = await Rol.findOne({ name: "admin" });
//   if (!adminRol) {
//     return NextResponse.json({ error: "Rol admin no encontrado" }, { status: 404 });
//   }

//   // Obtener usuarios con ese rol (sin planes)
//   const usuarios = await User.find({ id_rol: adminRol._id }).populate('id_rol')

//   // Retornar solo usuarios con rol
//   return NextResponse.json({ usuarios })
// }


// export async function POST(req: Request) {
//   try {
//     await connectToDatabase()
//     const { email, password } = await req.json()

//     // Validar campos obligatorios
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email y password son requeridos" }, { status: 400 })
//     }

//     // Buscar rol admin
//     const adminRol = await Rol.findOne({ name: "admin" })
//     if (!adminRol) {
//       return NextResponse.json({ error: "Rol admin no encontrado" }, { status: 404 })
//     }

//     // Verificar que no exista usuario con ese email
//     const userExists = await User.findOne({ email })
//     if (userExists) {
//       return NextResponse.json({ error: "Email ya registrado" }, { status: 409 })
//     }

//     // Encriptar password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Crear usuario con rol admin
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       id_rol: adminRol._id,
//       is_active: true,
//       used_tokens: 0,
//     })

//     await newUser.save()

//     return NextResponse.json({ message: "Usuario admin creado", userId: newUser._id })
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Error interno" }, { status: 500 })
//   }
// }


import { prisma } from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// GET: Obtener todos los usuarios con rol "admin"
export async function GET() {
  // 1. Obtener el rol admin
  const adminRol = await prisma.rol.findUnique({
    where: { name: 'admin' },
  })

  if (!adminRol) {
    return NextResponse.json({ error: 'Rol admin no encontrado' }, { status: 404 })
  }

  // 2. Obtener usuarios con ese rol
  const usuarios = await prisma.user.findMany({
    where: { id_rol: adminRol.id },
    include: { rol: true },
  })

  return NextResponse.json({ usuarios })
}

// POST: Crear un usuario con rol admin
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validar campos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y password son requeridos' },
        { status: 400 }
      )
    }

    // Buscar rol admin
    const adminRol = await prisma.rol.findUnique({
      where: { name: 'admin' },
    })

    if (!adminRol) {
      return NextResponse.json({ error: 'Rol admin no encontrado' }, { status: 404 })
    }

    // Verificar si ya existe el email
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario admin
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        id_rol: adminRol.id,
        is_active: true,
        used_tokens: 0,
      },
    })

    return NextResponse.json({
      message: 'Usuario admin creado',
      userId: newUser.id,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}


