import { NextResponse } from 'next/server'
import {main} from '@/lib/seeding/mongo'

export async function POST(request: Request) { 
  const result = await main()
  return NextResponse.json({ message: result })
}
