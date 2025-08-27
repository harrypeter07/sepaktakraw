import Image from "next/image";
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export default function ElectionsPage() {
  const electionDocuments = [
    {
      id: 1,
      title: "ELECTIONS OF OFFICE BEARERS & EXECUTIVE MEMBERS",
      subtitle: "FOR THE TERM OF 2024-2028",
      type: "Main Notice",
      description: "Official notice for the election of office bearers and executive members for the term 2024-2028",
      downloadUrl: "/documents/election-notice-2024-2028.pdf",
      icon: "📋"
    },
    {
      id: 2,
      title: "NOTICE FOR ELECTION AGM 2024-2028",
      subtitle: "Annual General Meeting Notice",
      type: "AGM Notice",
      description: "Notice for the Annual General Meeting where elections will be conducted",
      downloadUrl: "/documents/agm-notice-2024-2028.pdf",
      icon: "📢"
    },
    {
      id: 3,
      title: "RO APPOINTMENT LETTER",
      subtitle: "Returning Officer Appointment",
      type: "Appointment",
      description: "Official appointment letter for the Returning Officer for the elections",
      downloadUrl: "/documents/ro-appointment-letter.pdf",
      icon: "👨‍⚖️"
    },
    {
      id: 4,
      title: "ELECTION SCHEDULE",
      subtitle: "Complete Timeline",
      type: "Schedule",
      description: "Detailed schedule of all election-related activities and deadlines",
      downloadUrl: "/documents/election-schedule.pdf",
      icon: "📅"
    },
    {
      id: 5,
      title: "ELECTORAL COLLEGE",
      subtitle: "Voter List & Eligibility",
      type: "Voter Information",
      description: "Complete list of eligible voters and electoral college composition",
      downloadUrl: "/documents/electoral-college.pdf",
      icon: "🗳️"
    }
  ];

  const nominationForms = [
    {
      id: 6,
      title: "PRESIDENT – NOMINATION FORM",
      subtitle: "Executive Committee President",
      type: "Nomination Form",
      description: "Official nomination form for the position of President",
      downloadUrl: "/documents/president-nomination-form.pdf",
      icon: "👑"
    },
    {
      id: 7,
      title: "SECRETARY GENERAL – NOMINATION FORM",
      subtitle: "Executive Committee Secretary General",
      type: "Nomination Form",
      description: "Official nomination form for the position of Secretary General",
      downloadUrl: "/documents/secretary-general-nomination-form.pdf",
      icon: "📝"
    },
    {
      id: 8,
      title: "TREASURER – NOMINATION FORM",
      subtitle: "Executive Committee Treasurer",
      type: "Nomination Form",
      description: "Official nomination form for the position of Treasurer",
      downloadUrl: "/documents/treasurer-nomination-form.pdf",
      icon: "💰"
    },
    {
      id: 9,
      title: "VICE PRESIDENT – NOMINATION FORM",
      subtitle: "Executive Committee Vice President",
      type: "Nomination Form",
      description: "Official nomination form for the position of Vice President",
      downloadUrl: "/documents/vice-president-nomination-form.pdf",
      icon: "🏆"
    },
    {
      id: 10,
      title: "JOINT SECRETARY – NOMINATION FORM",
      subtitle: "Executive Committee Joint Secretary",
      type: "Nomination Form",
      description: "Official nomination form for the position of Joint Secretary",
      downloadUrl: "/documents/joint-secretary-nomination-form.pdf",
      icon: "📋"
    },
    {
      id: 11,
      title: "EXECUTIVE MEMBERS – NOMINATION FORM",
      subtitle: "Executive Committee Members",
      type: "Nomination Form",
      description: "Official nomination form for Executive Committee Members",
      downloadUrl: "/documents/executive-members-nomination-form.pdf",
      icon: "👥"
    }
  ];

  const additionalDocuments = [
    {
      id: 12,
      title: "SAMPLE FILLED FORM FOR NOMINATION",
      subtitle: "Example Completed Form",
      type: "Sample Form",
      description: "Sample filled nomination form for reference",
      downloadUrl: "/documents/sample-filled-nomination-form.pdf",
      icon: "📄"
    },
    {
      id: 13,
      title: "NOMINATION WITHDRAWAL FORM",
      subtitle: "Withdrawal of Nomination",
      type: "Withdrawal Form",
      description: "Form to withdraw nomination from elections",
      downloadUrl: "/documents/nomination-withdrawal-form.pdf",
      icon: "❌"
    },
    {
      id: 14,
      title: "MODEL ELECTION GUIDELINES OF STFI",
      subtitle: "STFI Guidelines",
      type: "Guidelines",
      description: "Model election guidelines from Sepaktakraw Federation of India",
      downloadUrl: "/documents/stfi-election-guidelines.pdf",
      icon: "📖"
    },
    {
      id: 15,
      title: "FORM -3 : LIST OF NOMINATED CANDIDATES",
      subtitle: "Nominated Candidates List",
      type: "Official Form",
      description: "Form-3: Complete list of all nominated candidates",
      downloadUrl: "/documents/form-3-nominated-candidates.pdf",
      icon: "📊"
    },
    {
      id: 16,
      title: "FORM -4 : LIST OF VALIDLY NOMINATED CANDIDATES",
      subtitle: "Valid Nominations",
      type: "Official Form",
      description: "Form-4: List of candidates with valid nominations",
      downloadUrl: "/documents/form-4-valid-nominations.pdf",
      icon: "✅"
    },
    {
      id: 17,
      title: "FORM -6 : LIST OF CONTESTING CANDIDATES",
      subtitle: "Final Contestants",
      type: "Official Form",
      description: "Form-6: Final list of candidates contesting the elections",
      downloadUrl: "/documents/form-6-contesting-candidates.pdf",
      icon: "🏁"
    },
    {
      id: 18,
      title: "FORM -15 : DECLARATION OF RESULTS",
      subtitle: "Election Results",
      type: "Official Form",
      description: "Form-15: Official declaration of election results",
      downloadUrl: "/documents/form-15-election-results.pdf",
      icon: "🎉"
    }
  ];

  const electionSchedule = [
    {
      date: "2024-11-01",
      event: "Notification of Elections",
      description: "Official notification and call for nominations"
    },
    {
      date: "2024-11-15",
      event: "Last Date for Nominations",
      description: "Deadline for submitting nomination forms"
    },
    {
      date: "2024-11-20",
      event: "Scrutiny of Nominations",
      description: "Verification and validation of nominations"
    },
    {
      date: "2024-11-25",
      event: "Last Date for Withdrawal",
      description: "Deadline for candidates to withdraw nominations"
    },
    {
      date: "2024-12-01",
      event: "Publication of Final List",
      description: "Final list of contesting candidates"
    },
    {
      date: "2024-12-15",
      event: "Election Day",
      description: "Voting and counting of votes"
    },
    {
      date: "2024-12-16",
      event: "Declaration of Results",
      description: "Official announcement of election results"
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
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Elections 2024-2028</h1>
          <p className="text-lead">
            Elections of Office Bearers & Executive Members for the Term of 2024-2028
          </p>
        </div>

        {/* Main Election Notice */}
        <Section className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ELECTIONS OF OFFICE BEARERS & EXECUTIVE MEMBERS
              </h2>
              <p className="text-xl text-white/90 mb-6">
                FOR THE TERM OF 2024-2028
              </p>
              <p className="text-lg text-white/80 mb-6">
                Maharashtra Sepaktakraw Association is pleased to announce the elections for 
                various positions in the Executive Committee for the term 2024-2028.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" className="bg-white text-bright-red hover:bg-white/90">
                  📋 Download Main Notice
                </Button>
                <Button variant="outline" className="bg-white text-bright-red hover:bg-white/90">
                  📅 View Election Schedule
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Election Schedule */}
        <Section title="Election Schedule" className="mb-8 md:mb-12">
          <Card>
            <div className="grid md:grid-cols-2 gap-6">
              {electionSchedule.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-bright-red/10 rounded-full flex items-center justify-center">
                      <span className="text-bright-red font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-bright-red font-semibold mb-1">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <h4 className="font-semibold text-dark-gray mb-1">{item.event}</h4>
                    <p className="text-sm text-medium-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Main Election Documents */}
        <Section title="Main Election Documents" className="mb-8 md:mb-12">
          <Grid cols={2} gap="lg">
            {electionDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{doc.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge variant="primary" size="sm" className="mb-2">{doc.type}</Badge>
                    <h3 className="text-heading mb-2">{doc.title}</h3>
                    <p className="text-small text-medium-gray mb-2">{doc.subtitle}</p>
                    <p className="text-body mb-4">{doc.description}</p>
                    <Button variant="primary" size="sm" className="w-full">
                      📥 Download Document
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Nomination Forms */}
        <Section title="Nomination Forms" className="mb-8 md:mb-12">
          <Grid cols={2} gap="lg">
            {nominationForms.map((form) => (
              <Card key={form.id} className="hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{form.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge variant="accent" size="sm" className="mb-2">{form.type}</Badge>
                    <h3 className="text-heading mb-2">{form.title}</h3>
                    <p className="text-small text-medium-gray mb-2">{form.subtitle}</p>
                    <p className="text-body mb-4">{form.description}</p>
                    <Button variant="accent" size="sm" className="w-full">
                      📝 Download Form
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Additional Documents */}
        <Section title="Additional Documents & Forms" className="mb-8 md:mb-12">
          <Grid cols={2} gap="lg">
            {additionalDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-medium-gray/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{doc.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" size="sm" className="mb-2">{doc.type}</Badge>
                    <h3 className="text-heading mb-2">{doc.title}</h3>
                    <p className="text-small text-medium-gray mb-2">{doc.subtitle}</p>
                    <p className="text-body mb-4">{doc.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      📥 Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Important Information */}
        <Section title="Important Information" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-dark-gray to-medium-gray text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Election Guidelines & Procedures
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Must be registered member for 2+ years</li>
                    <li>• Age requirement: 25+ years</li>
                    <li>• Good standing in the association</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Nomination Process</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Submit completed nomination form</li>
                    <li>• Include supporting documents</li>
                    <li>• Pay nomination fee if applicable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Voting Process</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Secret ballot voting</li>
                    <li>• One vote per eligible member</li>
                    <li>• Results announced within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Contact for Queries */}
        <Section title="Need Help?" className="mb-8 md:mb-12">
          <Card className="text-center">
            <h3 className="text-heading mb-4">Questions About Elections?</h3>
            <p className="text-body mb-6">
              If you have questions about the election process, nomination forms, or need clarification, 
              our election commission is here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/contact">
                Contact Election Commission
              </Button>
              <Button variant="outline" href="/rules">
                View Election Rules
              </Button>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}
