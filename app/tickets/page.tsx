import Pagination from "@/components/pagination";
import { updateStatus } from "@/lib/actions/tickets";
import { deleteTicket } from "@/lib/actions/tickets";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const instant = false;

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: number; limit?: number }>;
}) {

  const params = await searchParams;
  const status = (params.status ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = Math.max(5, Number(params.limit ?? 5));

  const where = {
    ...(status ? { status: { contains: status, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.ticket.count({ where }),
    prisma.ticket.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="ml-40 mr-40 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="w-full p-4 flow-root">
              <h1 className="text-2xl font-semibold text-gray-900">
                Tickets
              </h1>
              <p className="text-sm text-gray-500">
                Manage tickets and track the status.
              </p>
              <Link
                href="/tickets/stats"
                className="ml-10 mr-10 px-6 py-3 bg-indigo-200 text-gray-800 rounded-lg hover:bg-indigo-300 float-right"
              >
                View Stats
              </Link>
              <Link
                href="/create-ticket"
                className="ml-10 mr-10 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 float-right"
              >
                Create Ticket
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="flex gap-2" action="/tickets" method="GET">
              <input
                name="q"
                placeholder="Search tickets..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Search
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((ticket, key) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {ticket.title}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {ticket.description || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      {ticket.priority}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {ticket.status}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      <div className="low-root">
                        {/* Update ticket status */}
                        <form 
                          action={async (formData) => {
                            'use server';
                            await updateStatus(formData);
                          }} 
                          className="p-4 inline"
                          >
                          <label htmlFor="status" className="block text-sm font-medium mb-1">
                            Update Ticket Status:
                          </label>
                          <select
                            id="status"
                            name="status"
                            className="p-2 border bg-white text-gray-800"
                            required
                          >
                            <option value="">--select--</option>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="closed">closed</option>
                          </select>
                          <input type="hidden" name="id" value={ticket.id} />
                          <button className="p-2 border bg-indigo-600 text-white hover:bg-indigo-700">
                            Save
                          </button>
                        </form>
                        {/* Delete ticket */}
                        <form
                          action={async (formData: FormData) => {
                            "use server";
                            await deleteTicket(formData);
                          }}
                          className="m-10 inline"
                        >
                          <input type="hidden" name="id" value={ticket.id} />
                          <button className="mt-10 mb-5 px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                            Delete
                          </button>
                        </form>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/tickets"
                searchParams={{
                  status,
                  pageSize: String(pageSize),
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
