import Image from "next/image";
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export default function HistoryPage() {
  const timelineEvents = [
    {
      year: "1985",
      title: "Foundation",
      description: "Maharashtra Sepaktakraw Association was established with the vision of promoting traditional Southeast Asian sports in Maharashtra.",
      category: "Foundation",
      image: "/mskt-logo.svg"
    },
    {
      year: "1987",
      title: "First State Championship",
      description: "Organized the inaugural Maharashtra State Sepaktakraw Championship in Mumbai, marking the beginning of competitive play.",
      category: "Tournament",
      image: "/mskt-logo.svg"
    },
    {
      year: "1990",
      title: "National Recognition",
      description: "Gained recognition from the All India Sepaktakraw Federation and participated in national championships.",
      category: "Recognition",
      image: "/mskt-logo.svg"
    },
    {
      year: "1995",
      title: "District Expansion",
      description: "Expanded to include 15 districts across Maharashtra, establishing district-level associations.",
      category: "Expansion",
      image: "/mskt-logo.svg"
    },
    {
      year: "2000",
      title: "International Participation",
      description: "First Maharashtra players represented India in international Sepaktakraw tournaments.",
      category: "International",
      image: "/mskt-logo.svg"
    },
    {
      year: "2005",
      title: "Training Programs",
      description: "Launched comprehensive training programs for players, coaches, and officials across the state.",
      category: "Development",
      image: "/mskt-logo.svg"
    },
    {
      year: "2010",
      title: "Youth Development",
      description: "Introduced Sepaktakraw in schools and colleges, establishing youth development programs.",
      category: "Youth",
      image: "/mskt-logo.svg"
    },
    {
      year: "2015",
      title: "Digital Transformation",
      description: "Modernized association operations with digital platforms and online registration systems.",
      category: "Technology",
      image: "/mskt-logo.svg"
    },
    {
      year: "2020",
      title: "Pandemic Response",
      description: "Adapted to COVID-19 challenges with virtual training and online tournaments.",
      category: "Adaptation",
      image: "/mskt-logo.svg"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Launched comprehensive development plan for the next decade, focusing on grassroots development and international excellence.",
      category: "Vision",
      image: "/mskt-logo.svg"
    }
  ];

  const keyFigures = [
    {
      name: "Rajesh Kumar",
      position: "Founding President (1985-1995)",
      contribution: "Established the association and laid the foundation for Sepaktakraw in Maharashtra",
      image: "/mskt-logo.svg"
    },
    {
      name: "Priya Sharma",
      position: "Former Secretary (1990-2000)",
      contribution: "Expanded district network and established training programs",
      image: "/mskt-logo.svg"
    },
    {
      name: "Amit Patel",
      position: "Former Treasurer (1995-2005)",
      contribution: "Developed financial systems and secured government funding",
      image: "/mskt-logo.svg"
    },
    {
      name: "Dr. Meera Singh",
      position: "Technical Director (2000-2015)",
      contribution: "Introduced modern training methodologies and international standards",
      image: "/mskt-logo.svg"
    }
  ];

  const achievements = [
    {
      title: "State Championships",
      count: "35+",
      description: "Annual state championships held since 1987"
    },
    {
      title: "National Medals",
      count: "50+",
      description: "Medals won in national championships"
    },
    {
      title: "International Players",
      count: "25+",
      description: "Players who represented India internationally"
    },
    {
      title: "Active Districts",
      count: "36",
      description: "Districts with active Sepaktakraw associations"
    },
    {
      title: "Registered Players",
      count: "5000+",
      description: "Active players across all age groups"
    },
    {
      title: "Certified Coaches",
      count: "150+",
      description: "Trained and certified coaches"
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
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Our History</h1>
          <p className="text-lead">
            Celebrating nearly four decades of promoting Sepaktakraw across Maharashtra
          </p>
        </div>

        {/* Hero Section */}
        <Section className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-bright-red to-orange text-white">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Established in 1985
              </h2>
              <p className="text-xl text-white/90 mb-6">
                From humble beginnings to becoming one of India's leading Sepaktakraw associations, 
                we've been dedicated to promoting this beautiful sport for over 35 years.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">35+</div>
                  <div className="text-sm text-white/80">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">36</div>
                  <div className="text-sm text-white/80">Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5000+</div>
                  <div className="text-sm text-white/80">Active Players</div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Timeline */}
        <Section title="Historical Timeline" className="mb-8 md:mb-12">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-bright-red to-orange"></div>
            
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-bright-red rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-16 flex-1">
                    <Card className="hover:shadow-xl transition-shadow duration-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image 
                            src={event.image} 
                            alt={event.title} 
                            width={48} 
                            height={48}
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="primary" size="sm">{event.year}</Badge>
                            <Badge variant="outline" size="sm">{event.category}</Badge>
                          </div>
                          <h3 className="text-heading mb-2">{event.title}</h3>
                          <p className="text-body">{event.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Key Figures */}
        <Section title="Key Historical Figures" className="mb-8 md:mb-12">
          <Grid cols={2} gap="lg">
            {keyFigures.map((figure, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image 
                      src={figure.image} 
                      alt={figure.name} 
                      width={64} 
                      height={64}
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading mb-1">{figure.name}</h3>
                    <p className="text-small text-bright-red font-medium mb-2">{figure.position}</p>
                    <p className="text-body">{figure.contribution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Achievements */}
        <Section title="Key Achievements" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow duration-200">
                <div className="text-4xl font-bold text-bright-red mb-2">{achievement.count}</div>
                <h3 className="text-heading mb-2">{achievement.title}</h3>
                <p className="text-small text-medium-gray">{achievement.description}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Historical Documents */}
        <Section title="Historical Documents & Archives" className="mb-8 md:mb-12">
          <Card>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-heading mb-4">Document Archives</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📋 Original Constitution (1985)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 Historical Tournament Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📸 Historical Photographs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📰 Newspaper Articles & Media Coverage
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-heading mb-4">Video Archives</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    🎥 First State Championship (1987)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎬 Historical Match Highlights
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📺 Documentary: Journey of MSKT
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎭 Cultural Performances & Ceremonies
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Future Vision */}
        <Section title="Looking Forward" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-dark-gray to-medium-gray text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Building on Our Legacy
              </h3>
              <p className="text-lg text-white/90 mb-6">
                As we look to the future, we remain committed to our founding principles while 
                embracing innovation and modern approaches to sports development.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Grassroots Development</h4>
                  <p className="text-sm text-white/80">Expanding youth programs and school partnerships</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">International Excellence</h4>
                  <p className="text-sm text-white/80">Preparing players for international competitions</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Digital Innovation</h4>
                  <p className="text-sm text-white/80">Leveraging technology for better training and management</p>
                </div>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}
