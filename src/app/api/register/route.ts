import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from "@/lib/mongodb/mongodb";
import {User}  from "@/models/user";

export async function POST(request: Request) {
  await connectToDatabase()
  const { email, password } = await request.json()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json({ error: 'Usuario ya existe' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ email, password: hashedPassword })

  return NextResponse.json({ message: 'Usuario registrado', user: { id: newUser._id, email: newUser.email } })
}
