import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: any) {
  try {
    // Use Prisma's groupBy to aggregate counts by status
    const statsGroup = await prisma.ticket.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Format the response into a clean, flat key-value object
    // Example output: { open: 12, closed: 5, resolved: 3 }
    const formattedStats = statsGroup.reduce((acc, current) => {
      acc[current.status] = current._count.status;
      return acc;
    }, {});

    return NextResponse.json({ stats: formattedStats }, { status: 200 });

  } catch (error) {
    console.error('Prisma Stats Error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while retrieving statistics.' },
      { status: 500 }
    );
  }
}
