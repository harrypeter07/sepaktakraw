
import Image from "next/image";
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export default function MediaPage() {
  const mediaCategories = [
    {
      title: "Official Documents",
      description: "Constitution, bylaws, and official policies",
      icon: "📋",
      href: "/compliance",
      color: "bg-bright-red"
    },
    {
      title: "Photo Gallery",
      description: "Tournament photos and event highlights",
      icon: "📸",
      href: "/gallery",
      color: "bg-orange"
    },
    {
      title: "Videos",
      description: "Match highlights and training videos",
      icon: "🎥",
      href: "/videos",
      color: "bg-dark-gray"
    },
    {
      title: "Press Releases",
      description: "Official announcements and media statements",
      icon: "📢",
      href: "/press",
      color: "bg-bright-red"
    }
  ];

  const recentUpdates = [
    {
      title: "State Championship 2024",
      type: "Tournament",
      date: "2024-01-15",
      status: "Upcoming"
    },
    {
      title: "New Training Program Launched",
      type: "Training",
      date: "2024-01-10",
      status: "Active"
    },
    {
      title: "District Selection Trials",
      type: "Selection",
      date: "2024-01-08",
      status: "Registration Open"
    }
  ];

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4 md:mb-6">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={60} 
              height={60}
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Media & Resources</h1>
          <p className="text-lead">
            Access official documents, media resources, and latest updates
          </p>
        </div>

        {/* Media Categories */}
        <Section title="Media Categories" className="mb-8 md:mb-12">
          <Grid cols={4} gap="lg">
            {mediaCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow duration-200">
                <div className={`${category.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-3`}>
                  {category.icon}
                </div>
                <h3 className="text-heading mb-2">{category.title}</h3>
                <p className="text-body mb-4">{category.description}</p>
                <Button variant="outline" href={category.href} size="sm">
                  Explore
                </Button>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Recent Updates */}
        <Section title="Recent Updates" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            {recentUpdates.map((update, index) => (
              <Card key={index}>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" size="sm">
                    {update.type}
                  </Badge>
                  <span className="text-caption">
                    {new Date(update.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-dark-gray mb-2 text-sm">{update.title}</h3>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={update.status === 'Active' ? 'primary' : update.status === 'Upcoming' ? 'secondary' : 'neutral'}
                    size="sm"
                  >
                    {update.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Media Guidelines */}
        <Card className="mb-8 md:mb-12">
          <h2 className="text-heading mb-4">Media Guidelines</h2>
          <div className="space-y-4">
            <div className="p-3 md:p-4 bg-off-white rounded-lg border border-gray-100">
              <h3 className="font-semibold text-dark-gray mb-2 text-sm">Photo & Video Usage</h3>
              <p className="text-body">
                All media content is property of MSKT. For commercial use, please contact our media team.
              </p>
            </div>

            <div className="p-3 md:p-4 bg-off-white rounded-lg border border-gray-100">
              <h3 className="font-semibold text-dark-gray mb-2 text-sm">Press Inquiries</h3>
              <p className="text-body">
                Journalists and media representatives can contact us at press@mskt.org for official statements and interviews.
              </p>
            </div>

            <div className="p-3 md:p-4 bg-off-white rounded-lg border border-gray-100">
              <h3 className="font-semibold text-dark-gray mb-2 text-sm">Content Requests</h3>
              <p className="text-body">
                For specific content requests or high-resolution images, please use the contact form below.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-dark-gray to-medium-gray text-white rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Media Resources?</h2>
          <p className="text-white/90 mb-6 text-sm md:text-base">
            Contact our media team for specific content requests, press inquiries, or media partnerships.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Button
              variant="primary"
              href="/contact"
            >
              Contact Media Team
            </Button>
            <Button
              variant="outline"
              href="/notices"
            >
              View Latest Notices
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
