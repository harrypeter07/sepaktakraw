import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  // For now, we'll use results as events since there's no dedicated events model
  // In a real implementation, you might want a separate Event model
  const upcomingEvents = await prisma.result.findMany({
    where: {
      date: {
        gte: new Date(),
      },
      published: true,
    },
    include: {
      district: true,
    },
    orderBy: { date: "asc" },
    take: 10,
  });

  const pastEvents = await prisma.result.findMany({
    where: {
      date: {
        lt: new Date(),
      },
      published: true,
    },
    include: {
      district: true,
    },
    orderBy: { date: "desc" },
    take: 20,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Events & Tournaments</h1>
      
      {/* Upcoming Events */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
        
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500">Check back later for upcoming tournaments and events.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="mb-4">
                  <div className="text-sm text-green-600 font-medium mb-2">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.teamA} vs {event.teamB}
                  </h3>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Level:</span> {event.level}
                  </div>
                  {event.stage && (
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Stage:</span> {event.stage}
                    </div>
                  )}
                  {event.venue && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">📍 Venue:</span> {event.venue}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {event.district?.name || "All Districts"}
                  </span>
                  <Link
                    href={`/results/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Past Events</h2>
        
        {pastEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No past events available.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.teamA} vs {event.teamB}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.level} {event.stage && `• ${event.stage}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.scoreA !== null && event.scoreB !== null ? (
                        <span className="text-lg font-bold">
                          <span className="text-blue-600">{event.scoreA}</span>
                          <span className="mx-2 text-gray-400">-</span>
                          <span className="text-red-600">{event.scoreB}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">TBD</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.venue || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}


