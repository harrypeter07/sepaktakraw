import { db } from "@/lib/data";
import { Card, Section, Grid, Badge } from "@/components/ui";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  // Fetch latest notices as news
  const notices = await db.getNotices({ published: true, limit: 12 });

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Latest News & Updates</h1>
          <p className="text-lead">
            Stay informed with the latest announcements and updates from Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* News Grid */}
        <Section title="Recent Updates" className="mb-8 md:mb-12">
          {notices.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No News Available</h3>
                <p className="text-medium-gray">Check back later for the latest updates.</p>
              </div>
            </Card>
          ) : (
            <Grid cols={3} gap="lg">
              {notices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-xl transition-shadow duration-200">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant={notice.priority === 'HIGH' ? 'primary' : 'secondary'} 
                        size="sm"
                      >
                        {notice.category}
                      </Badge>
                      {notice.priority === 'HIGH' && (
                        <Badge variant="primary" size="sm">High Priority</Badge>
                      )}
                    </div>
                    <div className="text-sm text-medium-gray font-medium mb-2">
                      📅 {new Date(notice.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-heading mb-2 line-clamp-2">
                      {notice.title}
                    </h3>
                    <p className="text-small text-medium-gray line-clamp-3">
                      {notice.body}
                    </p>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="mt-3">
                        <div className="text-xs text-medium-gray mb-1">Attachments:</div>
                        <div className="flex flex-wrap gap-1">
                          {notice.attachments.slice(0, 2).map((attachment, index) => (
                            <span key={index} className="mobile-badge-sm bg-gray-100 text-gray-700">
                              📎 {attachment}
                            </span>
                          ))}
                          {notice.attachments.length > 2 && (
                            <span className="mobile-badge-sm bg-gray-100 text-gray-700">
                              +{notice.attachments.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-medium-gray">
                      {notice.category}
                    </span>
                    <Link 
                      href={`/notices/${notice.id}`}
                      className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </Card>
              ))}
            </Grid>
          )}
        </Section>

        {/* CTA Section */}
        <Section title="Stay Connected" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Never Miss an Update
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Get the latest news, tournament updates, and important announcements 
              from Maharashtra Sepaktakraw Association.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/notices" 
                className="btn-secondary bg-white text-bright-red hover:bg-white/90"
              >
                View All Notices
              </Link>
              <Link 
                href="/contact" 
                className="btn-outline bg-white text-bright-red hover:bg-white/90"
              >
                Contact Us
              </Link>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


