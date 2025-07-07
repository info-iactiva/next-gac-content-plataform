
import { prisma } from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const {
      userid,
  } = await req.json();

  
  const usuario = await prisma.user.findUnique({
    where: { id: userid }, 
    include: {      
        plan: true
    },
  })

  // console.log("Usuario encontrado:", usuario);

  return NextResponse.json({ tokens_restantes: usuario.plan.tokens - usuario.used_tokens })
}
