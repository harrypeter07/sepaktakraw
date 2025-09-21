import Link from "next/link";
import { db } from "@/lib/data";
import { Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  // Fetch notices from database
  const notices = await db.getNotices({ published: true, limit: 20 });

  const noticesByCategory = notices.reduce((acc: Record<string, any[]>, notice: any) => {
    const category = notice.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(notice);
    return acc;
  }, {});
  const categories = Object.keys(noticesByCategory).sort();

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Notices & Updates</h1>
          <p className="text-lead">
            Stay informed with the latest announcements from Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Notices by Category */}
        {categories.length > 0 ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <Section key={category} title={category} className="mb-8 md:mb-12">
                <Grid cols={3} gap="lg">
                  {noticesByCategory[category].map((notice) => (
                    <Card key={notice.id} className="hover:shadow-xl transition-shadow duration-200">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge 
                            variant={notice.priority === 'HIGH' ? 'primary' : 'secondary'} 
                            size="sm"
                          >
                            {notice.category}
                          </Badge>
                          <span className="text-xs text-medium-gray">
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-heading mb-2 line-clamp-2">{notice.title}</h3>
                        <p className="text-small text-medium-gray line-clamp-3 mb-3">{notice.body}</p>
                        {notice.attachments && notice.attachments.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs text-medium-gray mb-1">Attachments:</div>
                            <div className="flex flex-wrap gap-1">
                              {notice.attachments.slice(0, 3).map((attachment: string, index: number) => (
                                <span key={index} className="mobile-badge-sm bg-gray-100 text-gray-700">
                                  📎 {attachment}
                                </span>
                              ))}
                              {notice.attachments.length > 3 && (
                                <span className="mobile-badge-sm bg-gray-100 text-gray-700">
                                  +{notice.attachments.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        {notice.priority === "HIGH" && (
                          <div className="mb-3">
                            <Badge variant="primary" size="sm">High Priority</Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/notices/${notice.id}`} 
                          className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                        >
                          Read More →
                        </Link>
                        <span className="text-xs text-medium-gray">
                          {notice.category}
                        </span>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </Section>
            ))}
          </div>
        ) : (
          <Section title="No Notices Available" className="mb-8 md:mb-12">
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Notices Available</h3>
                <p className="text-medium-gray">Check back later for the latest updates</p>
              </div>
            </Card>
          </Section>
        )}

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
                href="/results" 
                className="btn-secondary bg-white text-bright-red hover:bg-white/90"
              >
                View Results
              </Link>
              <Link 
                href="/districts" 
                className="btn-outline bg-white text-bright-red hover:bg-white/90"
              >
                Explore Districts
              </Link>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


