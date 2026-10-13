import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const instant = false;

export default async function TicketsStatsPage() {

  const [totalTickets, openTickets, inprogressTickets, closedTickets] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({
      where: { status: 'open' },
    }),
    prisma.ticket.count({
      where: { status: 'in_progress' },
    }),
    prisma.ticket.count({
      where: { status: 'closed' },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-40 mr-40 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="w-full p-4 flow-root">
              <h1 className="text-2xl font-semibold text-gray-900">
                Tickets Stats
              </h1>
              <p className="text-sm text-gray-500">
                
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Stats
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalTickets}
                </div>
                <div className="text-sm text-gray-600">Total Tickets</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {openTickets}
                </div>
                <div className="text-sm text-gray-600">Open Tickets</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {inprogressTickets}
                </div>
                <div className="text-sm text-gray-600">In-Progress Tickets</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {closedTickets}
                </div>
                <div className="text-sm text-gray-600">Closed Tickets</div>
              </div>
            </div>
            <Link
              href="/tickets"
              className="ml-10 mr-10 px-6 py-3 bg-indigo-200 text-gray-800 rounded-lg hover:bg-indigo-300 float-right"
            >
              View Tickets
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
