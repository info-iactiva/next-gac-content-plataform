import { prisma } from '@/lib/prisma/prisma'
import { startOfDay } from 'date-fns';

export async function registerUserDailyRequest(userId: number) {

    const today = startOfDay(new Date());

    const existing = await prisma.dailyRequest.findUnique({
        where: {
            day_userId: {
                day: today,
                userId,
            },
        },
    });

    if (existing) {
        await prisma.dailyRequest.update({
            where: {
                day_userId: {
                    day: today,
                    userId,
                },
            },
            data: {
            total: { increment: 1 },
            },
        });
    } else {
        await prisma.dailyRequest.create({
            data: {
                day: today,
                userId,
            },
        });
    }
}
