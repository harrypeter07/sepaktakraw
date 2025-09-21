import Image from "next/image";
import { Button, Card, Section, Grid, Badge, Timeline } from "@/components/ui";
import { db } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ElectionsPage() {
  // Fetch elections from database
  const elections = await db.getElections({ published: true, limit: 10 });
  
  // Get the most recent active or upcoming election
  const currentElection = elections.find(e => e.status === "ACTIVE" || e.status === "UPCOMING") || elections[0];
  
  // Get election documents for the current election
  const electionDocuments = currentElection ? await db.getElectionDocuments(currentElection.id) : [];
  
  // Get candidates for the current election
  const candidates = currentElection ? await db.getCandidates(currentElection.id) : [];

  // Create election schedule from current election dates
  const electionSchedule = currentElection ? [
    {
      date: new Date(currentElection.startDate).toISOString().split('T')[0],
      event: "Election Period Begins",
      description: "Nomination period opens and candidates can submit their applications."
    },
    {
      date: new Date(currentElection.endDate).toISOString().split('T')[0],
      event: "Election Period Ends",
      description: "Voting closes and results will be announced shortly after."
    }
  ] : [];

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
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">
            {currentElection ? currentElection.title : "Elections"}
          </h1>
          <p className="text-lead">
            {currentElection ? currentElection.description : "Association Elections and Voting"}
          </p>
        </div>

        {/* Current Election Status */}
        {currentElection && (
          <Section className="mb-8 md:mb-12">
            <Card className="bg-gradient-to-r from-bright-red to-orange text-white">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {currentElection.title}
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  {currentElection.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  <Badge variant="outline" className="bg-white text-bright-red">
                    {currentElection.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-bright-red">
                    {currentElection.type}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-bright-red">
                    {candidates.length} Candidates
                  </Badge>
                </div>
                <div className="text-sm text-white/80">
                  <div>Start Date: {new Date(currentElection.startDate).toLocaleDateString()}</div>
                  <div>End Date: {new Date(currentElection.endDate).toLocaleDateString()}</div>
                </div>
              </div>
            </Card>
          </Section>
        )}

        {/* Election Documents */}
        {electionDocuments.length > 0 && (
          <Section title="Election Documents" className="mb-8 md:mb-12">
            <Grid cols={3} gap="lg">
              {electionDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-xl transition-shadow duration-200">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" size="sm">
                        {doc.type}
                      </Badge>
                      <span className="text-xs text-medium-gray">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-heading mb-2 line-clamp-2">{doc.title}</h3>
                    {doc.content && (
                      <p className="text-small text-medium-gray line-clamp-3 mb-3">
                        {doc.content}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {doc.fileUrl ? (
                      <a 
                        href={doc.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                      >
                        Download →
                      </a>
                    ) : (
                      <span className="text-medium-gray text-sm">No file available</span>
                    )}
                    <span className="text-xs text-medium-gray">
                      {doc.type}
                    </span>
                  </div>
                </Card>
              ))}
            </Grid>
          </Section>
        )}

        {/* Candidates */}
        {candidates.length > 0 && (
          <Section title="Candidates" className="mb-8 md:mb-12">
            <Grid cols={2} gap="lg">
              {candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-bright-red">👤</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading mb-1">{candidate.name}</h3>
                      <Badge variant="primary" size="sm" className="mb-3">
                        {candidate.position}
                      </Badge>
                      {candidate.district && (
                        <div className="text-sm text-medium-gray mb-2">
                          District: {candidate.district.name}
                        </div>
                      )}
                      {candidate.bio && (
                        <p className="text-small text-medium-gray line-clamp-2">
                          {candidate.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          </Section>
        )}

        {/* Election Schedule */}
        {electionSchedule.length > 0 && (
          <Section title="Election Timeline" className="mb-8 md:mb-12">
            <Card>
              <Timeline items={electionSchedule} />
            </Card>
          </Section>
        )}

        {/* All Elections */}
        {elections.length > 1 && (
          <Section title="All Elections" className="mb-8 md:mb-12">
            <Grid cols={2} gap="lg">
              {elections.map((election) => (
                <Card key={election.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant={election.status === "ACTIVE" ? "primary" : "secondary"} 
                        size="sm"
                      >
                        {election.status}
                      </Badge>
                      <span className="text-xs text-medium-gray">
                        {new Date(election.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-heading mb-2 line-clamp-2">{election.title}</h3>
                    {election.description && (
                      <p className="text-small text-medium-gray line-clamp-3 mb-3">
                        {election.description}
                      </p>
                    )}
                    <div className="text-xs text-medium-gray mb-3">
                      <div>Start: {new Date(election.startDate).toLocaleDateString()}</div>
                      <div>End: {new Date(election.endDate).toLocaleDateString()}</div>
                      <div>Candidates: {election._count.candidates}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/elections/${election.id}`} 
                      className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                    <span className="text-xs text-medium-gray">
                      {election.type}
                    </span>
                  </div>
                </Card>
              ))}
            </Grid>
          </Section>
        )}

        {/* No Elections Message */}
        {elections.length === 0 && (
          <Section title="No Elections Available" className="mb-8 md:mb-12">
            <Card>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-dark-gray mb-2">No Elections Available</h3>
                <p className="text-medium-gray">Check back later for upcoming elections</p>
              </div>
            </Card>
          </Section>
        )}

        {/* CTA Section */}
        <Section title="Stay Informed" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Participate in Democracy
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Stay informed about upcoming elections, candidate information, and voting procedures 
              for the Maharashtra Sepaktakraw Association.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/notices" 
                className="btn-secondary bg-white text-bright-red hover:bg-white/90"
              >
                View Notices
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