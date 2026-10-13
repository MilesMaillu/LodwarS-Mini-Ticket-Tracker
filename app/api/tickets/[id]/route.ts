import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ●	PATCH /tickets/:id — update a ticket's status or priority
// In App Router, route contexts are passed as the second argument
export async function PATCH(request, { params }) {
  try {
    // 1. Await params to safely extract the dynamic ID from the URL
    const { id } = await params;

    // 2. Parse the request body
    const body = await request.json();
    const { status, priority } = body;

    // 3. Prevent empty updates
    if (status === undefined && priority === undefined) {
      return NextResponse.json(
        { error: 'Provide at least one field to update: status or priority.' },
        { status: 400 }
      );
    }

    // 4. Update the record in the database using Prisma
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
      },
    });

    return NextResponse.json(
      { message: 'Ticket updated successfully!', ticket: updatedTicket },
      { status: 200 }
    );

  } catch (error) {
    console.error('Prisma PATCH Error:', error);

    // Handle Prisma specific Record Not Found error (P2025)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error occurred while updating the ticket.' },
      { status: 500 }
    );
  }
}
