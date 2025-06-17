// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { connectToDatabase } from "@/lib/mongodb/mongodb";
// import {User}  from "@/models/user";

// const SECRET = process.env.JWT_SECRET!

// export async function POST(request: Request) {
//   console.log("Login request received");
//   await connectToDatabase()
//   const { email, password } = await request.json()

//   console.log("Email:", email);
//   const user = await User.findOne({ email })

//   if (!user) {
//     return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
//   }
//   if (!(await bcrypt.compare(password, user.password))) {
//     return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
//   }

//   const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1d' })

//   return NextResponse.json({ token, user: { id: user._id} })
// }
