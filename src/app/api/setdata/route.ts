import { NextResponse } from 'next/server'
import { seedData } from '@/lib/seeding/seeding'

export async function POST(request: Request) { 
  const result = await seedData()
  return NextResponse.json({ message: result })
}
