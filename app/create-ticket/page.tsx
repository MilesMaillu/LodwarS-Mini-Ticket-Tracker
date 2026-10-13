import { createTicket } from "../../lib/actions/tickets";
import Link from "next/link";

export default async function CreateTicketPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                New Ticket
              </h1>
              <p className="text-sm text-gray-500">
                Create a new ticket
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="space-y-6" action={createTicket}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  type="text" 
                  id="title" 
                  name="title" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" 
                  placeholder="Enter Title"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description (optional)
                </label>
                <textarea id="description"
                  name="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                  placeholder="Enter Description"></textarea>                
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" 
                    required
                  >
                    <option value="">--select--</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-5 mt-15">
                <Link
                  href="/tickets"
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
