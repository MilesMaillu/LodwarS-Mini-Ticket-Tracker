import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust path according to your structure

// ●	POST /tickets — create a ticket
export async function POST(request: any) {
  try {
    // 1. Parse incoming request body
    const body = await request.json();
    const { title, description, priority } = body;

    // 2. Validate essential fields
    if (!title || !priority) {
      return NextResponse.json(
        { error: 'Missing fields: title and priority are required.' },
        { status: 400 }
      );
    }

    // 3. Database operation: Create a new row in your database
    const newTicket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority || 'low',
        status: 'open', // set by default, but safe to declare explicitly
      },
    });

    // 4. Return the database-generated ticket object
    return NextResponse.json(
      { message: 'Ticket created successfully!', ticket: newTicket },
      { status: 201 }
    );

  } catch (error) {
    console.error('Prisma Error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while writing to the database.' },
      { status: 500 }
    );
  }
}

// ●	GET /tickets — list tickets
export async function GET(request: any) {
  try {
    // 1. Extract query params from the incoming URL
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // 2. Validate and compute pagination math
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, limit);
    const skip = (currentPage - 1) * currentLimit;

    // 3. Construct dynamic filter object
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    // 4. Run database queries concurrently for performance
    const [tickets, totalCount] = await Promise.all([
      prisma.ticket.findMany({
        where: whereClause,
        skip: skip,
        take: currentLimit,
        orderBy: { created_at: 'desc' }, // Latest tickets first
      }),
      prisma.ticket.count({ where: whereClause }),
    ]);

    // 5. Build pagination metadata
    const totalPages = Math.ceil(totalCount / currentLimit);

    return NextResponse.json({
      tickets,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage,
        limit: currentLimit,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Prisma GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while retrieving tickets.' },
      { status: 500 }
    );
  }
}