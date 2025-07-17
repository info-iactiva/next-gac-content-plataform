
import { prisma } from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const {
      userid,
  } = await req.json();
  
  if (!userid) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  const usuario = await prisma.user.findUnique({
    where: { id: userid } 
  })

  
  if (usuario) {
    await prisma.user.update({
      where: { id: usuario.id },
      data: { used_tokens: 0 },
    });    
  } else {
    console.log("Usuario no encontrado con ID:", userid);
    return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
  }


  return NextResponse.json({ message: 'Compra realizada con éxito' }, { status: 200 });
}
