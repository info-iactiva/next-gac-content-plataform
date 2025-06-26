// import { NextResponse } from 'next/server'
// import { connectToDatabase } from "@/lib/mongodb/mongodb";
// import { Plan } from '@/models/plan';

// export async function GET(request: Request) { 
//   await connectToDatabase()
//   const planes = await Plan.find({})
//   return NextResponse.json({planes })
// }
// app/api/planes/route.ts
import { prisma } from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const planes = await prisma.plan.findMany()
  return NextResponse.json({ planes })
}
