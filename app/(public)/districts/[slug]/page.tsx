import { notFound } from "next/navigation";
import { db } from "@/lib/data";
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch district from database
  const district = await db.getDistrictBySlug(slug);
  
  if (!district) return notFound();

  // Fetch officials for this district from database
  const officials = await db.getOfficials(district.id);

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">{district.name}</h1>
          {district.about && (
            <p className="text-lead max-w-3xl mx-auto">
              {district.about}
            </p>
          )}
        </div>

        {/* District Information */}
        <Section title="District Overview" className="mb-8 md:mb-12">
          <Card>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-heading mb-4">About {district.name}</h3>
                <p className="text-body mb-4">
                  {district.about || `The ${district.name} district is an active member of the Maharashtra Sepaktakraw Association, 
                  promoting the sport and organizing local tournaments and training programs.`}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-dark-gray w-24">Established:</span>
                    <span className="text-medium-gray">2020</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-dark-gray w-24">Active Players:</span>
                    <span className="text-medium-gray">150+</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-dark-gray w-24">Training Centers:</span>
                    <span className="text-medium-gray">3</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-heading mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-bright-red/10 rounded-xl">
                    <div className="text-2xl font-bold text-bright-red">150+</div>
                    <div className="text-sm text-medium-gray">Active Players</div>
                  </div>
                  <div className="text-center p-4 bg-orange/10 rounded-xl">
                    <div className="text-2xl font-bold text-orange">3</div>
                    <div className="text-sm text-medium-gray">Training Centers</div>
                  </div>
                  <div className="text-center p-4 bg-medium-gray/10 rounded-xl">
                    <div className="text-2xl font-bold text-medium-gray">12</div>
                    <div className="text-sm text-medium-gray">Local Tournaments</div>
                  </div>
                  <div className="text-center p-4 bg-dark-gray/10 rounded-xl">
                    <div className="text-2xl font-bold text-dark-gray">8</div>
                    <div className="text-sm text-medium-gray">Certified Coaches</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* District Officials */}
        <Section title="District Officials" className="mb-8 md:mb-12">
          {officials.length > 0 ? (
            <Grid cols={2} gap="lg">
              {officials.map((official) => (
                <Card key={official.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-bright-red">👤</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading mb-1">{official.name}</h3>
                      <Badge variant="primary" size="sm" className="mb-3">{official.position}</Badge>
                      <div className="space-y-2 text-sm">
                        {official.phone && (
                          <div className="flex items-center">
                            <span className="text-medium-gray mr-2">📞</span>
                            <span className="text-dark-gray">{official.phone}</span>
                          </div>
                        )}
                        {official.email && (
                          <div className="flex items-center">
                            <span className="text-medium-gray mr-2">✉️</span>
                            <span className="text-dark-gray">{official.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          ) : (
            <Card>
              <div className="text-center py-8">
                <h3 className="text-heading mb-4">No Officials Listed</h3>
                <p className="text-body">Officials information will be updated soon.</p>
              </div>
            </Card>
          )}
        </Section>

        {/* Upcoming Events */}
        <Section title="Upcoming Events" className="mb-8 md:mb-12">
          <Card>
            <div className="text-center py-8">
              <h3 className="text-heading mb-4">Local Tournaments & Events</h3>
              <p className="text-body mb-6">
                Stay tuned for upcoming local tournaments and training programs in {district.name} district.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" href="/events">
                  View All Events
                </Button>
                <Button variant="outline" href="/contact">
                  Contact District Office
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Training Programs */}
        <Section title="Training Programs" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-bright-red">🏃‍♂️</span>
              </div>
              <h3 className="text-heading mb-2">Youth Training</h3>
              <p className="text-body">Specialized training programs for young players aged 8-18 years</p>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange">🏆</span>
              </div>
              <h3 className="text-heading mb-2">Competitive Training</h3>
              <p className="text-body">Advanced training for competitive players and tournament preparation</p>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-medium-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-medium-gray">👨‍🏫</span>
              </div>
              <h3 className="text-heading mb-2">Coach Development</h3>
              <p className="text-body">Training programs for aspiring coaches and officials</p>
            </Card>
          </Grid>
        </Section>

        {/* Contact Information */}
        <Section title="Get in Touch" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join {district.name} District
              </h3>
              <p className="text-lg text-white/90 mb-6">
                Interested in joining our training programs or participating in local tournaments? 
                Contact our district officials for more information.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" href="/contact" className="bg-white text-bright-red hover:bg-white/90">
                  Contact Us
                </Button>
                <Button variant="outline" href="/events" className="bg-white text-bright-red hover:bg-white/90">
                  View Events
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


