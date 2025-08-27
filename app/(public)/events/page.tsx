
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  // Mock data for events since we don't have a database connection
  const upcomingEvents = [
    {
      id: 1,
      title: "Mumbai District Championship 2024",
      date: "2024-12-20",
      teamA: "Mumbai A",
      teamB: "Mumbai B",
      level: "District",
      stage: "Final",
      venue: "Mumbai Sports Complex",
      district: { name: "Mumbai" },
      type: "Tournament"
    },
    {
      id: 2,
      title: "Pune Open Tournament",
      date: "2024-12-25",
      teamA: "Pune Warriors",
      teamB: "Pune Eagles",
      level: "Open",
      stage: "Semi-Final",
      venue: "Pune Indoor Stadium",
      district: { name: "Pune" },
      type: "Tournament"
    },
    {
      id: 3,
      title: "Youth Training Camp",
      date: "2024-12-28",
      teamA: "Youth Team A",
      teamB: "Youth Team B",
      level: "Training",
      stage: "Practice Match",
      venue: "Nagpur Sports Academy",
      district: { name: "Nagpur" },
      type: "Training"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "State Championship 2024",
      date: "2024-11-15",
      teamA: "Maharashtra A",
      teamB: "Maharashtra B",
      level: "State",
      stage: "Final",
      venue: "Mumbai Sports Complex",
      district: { name: "Mumbai" },
      type: "Tournament",
      winner: "Maharashtra A"
    },
    {
      id: 5,
      title: "District League 2024",
      date: "2024-11-10",
      teamA: "Aurangabad Stars",
      teamB: "Aurangabad Warriors",
      level: "District",
      stage: "League Match",
      venue: "Aurangabad Stadium",
      district: { name: "Aurangabad" },
      type: "League",
      winner: "Aurangabad Stars"
    },
    {
      id: 6,
      title: "Coaching Workshop",
      date: "2024-11-05",
      teamA: "Coaches Group A",
      teamB: "Coaches Group B",
      level: "Workshop",
      stage: "Demonstration",
      venue: "Pune Sports Academy",
      district: { name: "Pune" },
      type: "Workshop"
    }
  ];

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Events & Tournaments</h1>
          <p className="text-lead">
            Stay updated with upcoming tournaments, training camps, and past events across Maharashtra
          </p>
        </div>
        
        {/* Upcoming Events */}
        <Section title="Upcoming Events" className="mb-8 md:mb-12">
          {upcomingEvents.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Upcoming Events</h3>
                <p className="text-medium-gray">Check back later for upcoming tournaments and events.</p>
              </div>
            </Card>
          ) : (
            <Grid cols={3} gap="lg">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-xl transition-shadow duration-200 border-l-4 border-green-500">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="primary" size="sm">{event.type}</Badge>
                      <Badge variant="secondary" size="sm">{event.level}</Badge>
                    </div>
                    <div className="text-sm text-green-600 font-medium mb-2">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-heading mb-2">
                      {event.teamA} vs {event.teamB}
                    </h3>
                    <div className="text-sm text-medium-gray mb-2">
                      <span className="font-medium">Stage:</span> {event.stage}
                    </div>
                    {event.venue && (
                      <div className="text-sm text-medium-gray">
                        <span className="font-medium">📍 Venue:</span> {event.venue}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-medium-gray">
                      {event.district?.name || "All Districts"}
                    </span>
                    <Button variant="outline" size="sm" href={`/results/${event.id}`}>
                      View Details →
                    </Button>
                  </div>
                </Card>
              ))}
            </Grid>
          )}
        </Section>

        {/* Past Events */}
        <Section title="Past Events" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            {pastEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow duration-200 border-l-4 border-gray-400">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="sm">{event.type}</Badge>
                    <Badge variant="outline" size="sm">{event.level}</Badge>
                  </div>
                  <div className="text-sm text-medium-gray font-medium mb-2">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-heading mb-2">
                    {event.teamA} vs {event.teamB}
                  </h3>
                  <div className="text-sm text-medium-gray mb-2">
                    <span className="font-medium">Stage:</span> {event.stage}
                  </div>
                  {event.venue && (
                    <div className="text-sm text-medium-gray mb-2">
                      <span className="font-medium">📍 Venue:</span> {event.venue}
                    </div>
                  )}
                  {event.winner && (
                    <div className="text-sm text-bright-red font-medium">
                      🏆 Winner: {event.winner}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-medium-gray">
                    {event.district?.name || "All Districts"}
                  </span>
                  <Button variant="outline" size="sm" href={`/results/${event.id}`}>
                    View Details →
                  </Button>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Event Categories */}
        <Section title="Event Categories" className="mb-8 md:mb-12">
          <Grid cols={4} gap="lg">
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-bright-red">🏆</span>
              </div>
              <h3 className="text-heading mb-2">Tournaments</h3>
              <p className="text-small text-medium-gray">Competitive matches and championships</p>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange">🏃‍♂️</span>
              </div>
              <h3 className="text-heading mb-2">Training Camps</h3>
              <p className="text-small text-medium-gray">Skill development and practice sessions</p>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-medium-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-medium-gray">👨‍🏫</span>
              </div>
              <h3 className="text-heading mb-2">Workshops</h3>
              <p className="text-small text-medium-gray">Coaching and technical training</p>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-dark-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-dark-gray">🎭</span>
              </div>
              <h3 className="text-heading mb-2">Exhibitions</h3>
              <p className="text-small text-medium-gray">Demonstration matches and showcases</p>
            </Card>
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section title="Get Involved" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Participate in Events
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Want to participate in upcoming tournaments or training programs? 
              Contact your district association for registration details.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" href="/contact" className="bg-white text-bright-red hover:bg-white/90">
                Contact Us
              </Button>
              <Button variant="outline" href="/districts" className="bg-white text-bright-red hover:bg-white/90">
                Find Your District
              </Button>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


