import { NextResponse } from 'next/server'
import { connectToDatabase } from "@/lib/mongodb/mongodb";
import { Plan } from '@/models/plan';

export async function GET(request: Request) { 
  await connectToDatabase()
  const planes = await Plan.find({})
  return NextResponse.json({planes })
}
