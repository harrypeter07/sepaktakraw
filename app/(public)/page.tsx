import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/data";
import { ModernHeroSection } from "@/components/sections/ModernHeroSection";
import { Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = createClient();

  // Recent Results
  let recentResults: any[] = [];
  let recentNotices: any[] = [];
  let districts: any[] = [];
  let recentElections: any[] = [];

  try {
    const { data, error } = await supabase
      .from("Result")
      .select("id, date, teamA, teamB, scoreA, scoreB, venue, published")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(3);
    if (!error && data) recentResults = data;
  } catch {}

  // Recent Notices
  try {
    const { data, error } = await supabase
      .from("notices")
      .select("id, title, body, category, createdAt, published, priority")
      .eq("published", true)
      .order("createdAt", { ascending: false })
      .limit(5);
    if (!error && data) recentNotices = data;
  } catch {}

  // Districts
  try {
    const { data, error } = await supabase
      .from("districts")
      .select("id, name, slug, about")
      .order("name", { ascending: true })
      .limit(6);
    if (!error && data) districts = data;
  } catch {}

  // Recent Elections
  try {
    recentElections = await db.getElections({ published: true, limit: 3 });
  } catch {}

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <ModernHeroSection 
        recentNotices={recentNotices}
        recentResults={recentResults}
        recentElections={recentElections}
      />

      {/* Quick Stats */}
      <Section title="Association Overview" className="py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-bright-red mb-2">{districts.length}</div>
            <div className="text-medium-gray">Active Districts</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-orange mb-2">{recentResults.length}</div>
            <div className="text-medium-gray">Recent Matches</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-dark-gray mb-2">{recentNotices.length}</div>
            <div className="text-medium-gray">Latest Updates</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-medium-gray mb-2">{recentElections.length}</div>
            <div className="text-medium-gray">Active Elections</div>
          </Card>
        </div>
      </Section>

      {/* Recent Results */}
      <Section title="Recent Results" className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-heading">Recent Results</h2>
          <Link href="/results" className="text-bright-red hover:text-red-700 font-medium">
            View All →
          </Link>
        </div>
        <Grid cols={3} gap="lg">
          {recentResults.map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="text-sm text-medium-gray mb-3">
                  {new Date(result.date).toLocaleDateString()}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-dark-gray">
                  {result.teamA} vs {result.teamB}
                </h3>
                {result.scoreA != null && result.scoreB != null && (
                  <div className="text-2xl font-bold text-center text-bright-red mb-3">
                    {result.scoreA} - {result.scoreB}
                  </div>
                )}
                {result.venue && (
                  <div className="text-sm text-medium-gray">
                    <span className="font-medium">Venue:</span> {result.venue}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Recent Notices */}
      <Section title="Latest Notices" className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-heading">Latest Notices</h2>
          <Link href="/notices" className="text-bright-red hover:text-red-700 font-medium">
            View All →
          </Link>
        </div>
        <Grid cols={3} gap="lg">
          {recentNotices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" size="sm">
                    {notice.category}
                  </Badge>
                  {notice.priority === "HIGH" && (
                    <Badge variant="primary" size="sm">URGENT</Badge>
                  )}
                </div>
                <div className="text-sm text-medium-gray mb-3">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-dark-gray line-clamp-2">
                  {notice.title}
                </h3>
                <p className="text-medium-gray text-sm line-clamp-3">
                  {notice.body}
                </p>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Districts Preview */}
      <Section title="Our Districts" className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-heading">Our Districts</h2>
          <Link href="/districts" className="text-bright-red hover:text-red-700 font-medium">
            View All →
          </Link>
        </div>
        <Grid cols={3} gap="lg">
          {districts.map((district) => (
            <Card key={district.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-3 text-dark-gray">
                  {district.name}
                </h3>
                {district.about && (
                  <p className="text-medium-gray text-sm line-clamp-3 mb-4">
                    {district.about}
                  </p>
                )}
                <Link
                  href={`/districts/${district.slug}`}
                  className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Elections Preview */}
      {recentElections.length > 0 && (
        <Section title="Active Elections" className="py-8 md:py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading">Active Elections</h2>
            <Link href="/elections" className="text-bright-red hover:text-red-700 font-medium">
              View All →
            </Link>
          </div>
          <Grid cols={2} gap="lg">
            {recentElections.map((election) => (
              <Card key={election.id} className="hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={election.status === "ACTIVE" ? "primary" : "secondary"} 
                      size="sm"
                    >
                      {election.status}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {election.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-dark-gray line-clamp-2">
                    {election.title}
                  </h3>
                  {election.description && (
                    <p className="text-medium-gray text-sm line-clamp-3 mb-4">
                      {election.description}
                    </p>
                  )}
                  <div className="text-xs text-medium-gray mb-4">
                    <div>Start: {new Date(election.startDate).toLocaleDateString()}</div>
                    <div>End: {new Date(election.endDate).toLocaleDateString()}</div>
                    <div>Candidates: {election._count.candidates}</div>
                  </div>
                  <Link
                    href={`/elections/${election.id}`}
                    className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </div>
  );
}


