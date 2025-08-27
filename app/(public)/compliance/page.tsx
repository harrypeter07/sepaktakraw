
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function CompliancePage() {
  // Mock compliance documents since we don't have a database connection
  const mockDocuments = [
    {
      id: 1,
      title: "Association Code of Conduct",
      section: "POLICIES",
      description: "Official code of conduct for all members and officials",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      url: "/documents/code-of-conduct.pdf"
    },
    {
      id: 2,
      title: "Anti-Doping Policy",
      section: "POLICIES",
      description: "Anti-doping policy and procedures for athletes",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
      url: "/documents/anti-doping-policy.pdf"
    },
    {
      id: 3,
      title: "Member Registration Form",
      section: "FORMS",
      description: "Official form for new member registration",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-05",
      url: "/documents/member-registration.pdf"
    },
    {
      id: 4,
      title: "Tournament Registration Form",
      section: "FORMS",
      description: "Form for tournament and event registration",
      createdAt: "2024-01-03",
      updatedAt: "2024-01-03",
      url: "/documents/tournament-registration.pdf"
    },
    {
      id: 5,
      title: "Coaching Guidelines",
      section: "GUIDELINES",
      description: "Best practices and guidelines for coaches",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      url: "/documents/coaching-guidelines.pdf"
    },
    {
      id: 6,
      title: "Tournament Organization Manual",
      section: "GUIDELINES",
      description: "Manual for organizing tournaments and events",
      createdAt: "2023-12-28",
      updatedAt: "2023-12-28",
      url: "/documents/tournament-manual.pdf"
    }
  ];

  // Filter documents by compliance-related sections
  const complianceDocs = mockDocuments.filter(doc => 
    doc.section === "POLICIES" || 
    doc.section === "FORMS" || 
    doc.section === "GUIDELINES"
  );

  // Group by section
  const docsBySection = complianceDocs.reduce((acc, doc) => {
    if (!acc[doc.section]) {
      acc[doc.section] = [];
    }
    acc[doc.section].push(doc);
    return acc;
  }, {} as Record<string, typeof complianceDocs>);

  return (
    <div className="min-h-screen bg-off-white py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Compliance & Policies</h1>
          <p className="text-lead max-w-3xl mx-auto">
            The Maharashtra Sepaktakraw Association is committed to maintaining high standards of compliance, 
            transparency, and ethical practices. Access our policies, forms, and guidelines here.
          </p>
        </div>

        {/* Compliance Overview */}
        <Section className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-heading mb-2">Policies</h3>
              <p className="text-small text-medium-gray">
                Official association policies and procedures
              </p>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-heading mb-2">Forms</h3>
              <p className="text-small text-medium-gray">
                Official forms and applications
              </p>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-heading mb-2">Guidelines</h3>
              <p className="text-small text-medium-gray">
                Best practices and guidelines
              </p>
            </Card>
          </Grid>
        </Section>

        {/* Documents by Section */}
        {Object.keys(docsBySection).length === 0 ? (
          <Section>
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Compliance Documents</h3>
                <p className="text-medium-gray">Compliance documents will be available here soon.</p>
              </div>
            </Card>
          </Section>
        ) : (
          <div className="space-y-8">
            {Object.entries(docsBySection).map(([section, docs]) => (
              <Section key={section} title={section.replace("_", " ")}>
                <Grid cols={3} gap="lg">
                  {docs.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow duration-200">
                      <div className="mb-4">
                        <Badge variant="secondary" size="sm" className="mb-3">{section}</Badge>
                        <h3 className="text-heading mb-2 line-clamp-2">
                          {doc.title}
                        </h3>
                        <p className="text-body text-medium-gray mb-3">
                          {doc.description}
                        </p>
                        <div className="text-xs text-medium-gray">
                          Updated: {new Date(doc.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" className="flex-1">
                          📥 Download
                        </Button>
                        <Button variant="outline" size="sm">
                          👁️ Preview
                        </Button>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </Section>
            ))}
          </div>
        )}

        {/* Additional Resources */}
        <Section title="Additional Resources" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help with Compliance?
              </h3>
              <p className="text-lg text-white/90 mb-6">
                Our compliance team is here to help you understand and implement our policies and procedures.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" href="/contact" className="bg-white text-bright-red hover:bg-white/90">
                  Contact Compliance Team
                </Button>
                <Button variant="outline" href="/rules" className="bg-white text-bright-red hover:bg-white/90">
                  View Rules & Regulations
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}
