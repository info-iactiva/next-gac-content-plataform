import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma'
import { parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const monthParam = searchParams.get('month'); // formato: YYYY-MM

  if (!monthParam) {
    return NextResponse.json({ error: 'Missing month parameter' }, { status: 400 });
  }

  let start: Date, end: Date;

  try {
    const parsedDate = parseISO(`${monthParam}-01`);
    start = startOfMonth(parsedDate);
    end = endOfMonth(parsedDate);
  } catch {
    return NextResponse.json({ error: 'Invalid month format. Use YYYY-MM' }, { status: 400 });
  }

  // 1. Traer todos los registros del mes
  const records = await prisma.dailyRequest.findMany({
    where: {
      day: {
        gte: start,
        lte: end,
      },
    },
    select: {
      day: true,
      total: true,
      userId: true,
      user: {
      select: {
        nombre: true, // o username, depende cómo tengas tu modelo
      },
    },
    },
    orderBy: {
      day: 'asc',
    },
  });

  // 2. Inicializar estructuras
  let totalGlobal = 0;
  const userStats: Record<number, { total: number; nombre: string }> = {};
  const dailyTotals: Record<string, number> = {};

for (const { day, total, userId, user } of records) {
  const dayStr = day.toISOString().split('T')[0];

  totalGlobal += total;

  if (!userStats[userId]) userStats[userId] = { total: 0, nombre: user.nombre };

  userStats[userId].total += total;

  if (!dailyTotals[dayStr]) dailyTotals[dayStr] = 0;
  dailyTotals[dayStr] += total;
}


  // 3. Generar todos los días del mes con total = 0 si no hay registro
  const allDays = eachDayOfInterval({ start, end }).map((d) => {
    const dayStr = d.toISOString().split('T')[0];
    return {
      day: dayStr,
      total: dailyTotals[dayStr] || 0,
    };
  });

  return NextResponse.json({
    totalGlobal,
   totalByUser: Object.entries(userStats).map(([userId, data]) => ({
    userId: Number(userId),
    total: data.total,
    nombre: data.nombre,
  })),
    totalByDay: allDays,
  });
}
