import { NextResponse } from 'next/server'
import { connectToDatabase } from "@/lib/mongodb/mongodb";
import { Rol } from '@/models/rol';

export async function GET(request: Request) { 
  await connectToDatabase()
  const roles = await Rol.find({})
  return NextResponse.json({ "roles": roles })
}
