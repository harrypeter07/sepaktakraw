import Image from "next/image";
import { Button, Card, Section, Grid, Badge } from "@/components/ui";

export default function RulesPage() {
  const gameRules = [
    {
      category: "Basic Rules",
      rules: [
        "Teams consist of 3 players on court at any time",
        "Substitutions are allowed during timeouts and between sets",
        "Matches are best of 3 sets, first to 21 points (win by 2)",
        "Service must be made from within the service circle",
        "Ball must not touch the ground during play"
      ]
    },
    {
      category: "Scoring",
      rules: [
        "Points are scored when the opposing team fails to return the ball",
        "A team wins a set by reaching 21 points with a 2-point advantage",
        "If tied at 20-20, play continues until one team leads by 2 points",
        "Maximum score in a set is 25 points (25-24 wins)"
      ]
    },
    {
      category: "Fouls & Violations",
      rules: [
        "Touching the ball with hands or arms is a foul",
        "Ball touching the ground results in a point for the opposing team",
        "Players cannot touch the net during play",
        "Service must be made within 5 seconds of referee's signal",
        "Unsportsmanlike conduct results in warnings or disqualification"
      ]
    },
    {
      category: "Equipment",
      rules: [
        "Official Sepaktakraw ball (rattan or synthetic)",
        "Court dimensions: 13.4m x 6.1m",
        "Net height: 1.52m for men, 1.42m for women",
        "Players must wear appropriate sports attire and footwear"
      ]
    }
  ];

  const tournamentRules = [
    {
      title: "Tournament Format",
      description: "Standard tournament structure and progression rules",
      rules: [
        "Single elimination or round-robin format based on participant count",
        "Seeding based on previous tournament performance or ranking",
        "Minimum 3-minute warm-up period before each match",
        "Official timeouts: 2 per set, 1 minute each"
      ]
    },
    {
      title: "Player Eligibility",
      description: "Requirements for tournament participation",
      rules: [
        "Players must be registered members of recognized associations",
        "Age categories: U-16, U-19, Senior (19+), Masters (35+)",
        "Medical fitness certificate required for all participants",
        "Players can represent only one district/team per tournament"
      ]
    },
    {
      title: "Match Conduct",
      description: "Behavioral and procedural guidelines",
      rules: [
        "Respect for officials, opponents, and spectators mandatory",
        "Appeals must be made through team captain only",
        "Video review available for critical decisions in final rounds",
        "Disciplinary action for rule violations or misconduct"
      ]
    }
  ];

  const technicalSpecifications = [
    {
      category: "Court Specifications",
      specs: [
        "Length: 13.4 meters (44 feet)",
        "Width: 6.1 meters (20 feet)",
        "Service circle: 0.3 meter radius",
        "Center line: 0.02 meter width",
        "Boundary lines: 0.04 meter width"
      ]
    },
    {
      category: "Net Specifications",
      specs: [
        "Height: 1.52m (men), 1.42m (women), 1.37m (junior)",
        "Width: 0.7 meters",
        "Mesh size: 0.04-0.05 meters",
        "Net posts: 1.55m height, 0.04m diameter"
      ]
    },
    {
      category: "Ball Specifications",
      specs: [
        "Circumference: 0.42-0.44 meters",
        "Weight: 170-180 grams",
        "Material: Natural rattan or synthetic equivalent",
        "Bounce: 0.3-0.5 meters when dropped from 1.8m height"
      ]
    }
  ];

  const officials = [
    {
      role: "Referee",
      responsibilities: [
        "Overall control of the match",
        "Final decision on all matters",
        "Scoring and timekeeping",
        "Disciplinary actions"
      ]
    },
    {
      role: "Linesmen",
      responsibilities: [
        "Judging ball in/out of bounds",
        "Service violations",
        "Net touches",
        "Assisting referee with decisions"
      ]
    },
    {
      role: "Scorer",
      responsibilities: [
        "Recording match scores",
        "Tracking timeouts",
        "Maintaining official score sheet",
        "Announcing scores to officials"
      ]
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
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Rules & Regulations</h1>
          <p className="text-lead">
            Official rules and regulations for Sepaktakraw competitions and tournaments
          </p>
        </div>

        {/* Quick Navigation */}
        <Section className="mb-8 md:mb-12">
          <Card>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <span className="text-lg">⚽</span>
                <span className="text-sm">Game Rules</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <span className="text-lg">🏆</span>
                <span className="text-sm">Tournament Rules</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <span className="text-lg">📏</span>
                <span className="text-sm">Technical Specs</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <span className="text-lg">👨‍⚖️</span>
                <span className="text-sm">Officials</span>
              </Button>
            </div>
          </Card>
        </Section>

        {/* Game Rules */}
        <Section title="Game Rules & Regulations" className="mb-8 md:mb-12">
          <Grid cols={2} gap="lg">
            {gameRules.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <h3 className="text-heading mb-4 text-bright-red">{category.category}</h3>
                <ul className="space-y-2">
                  {category.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start text-sm">
                      <span className="text-bright-red mr-2 mt-1">•</span>
                      <span className="text-medium-gray">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Tournament Rules */}
        <Section title="Tournament Rules & Guidelines" className="mb-8 md:mb-12">
          <div className="space-y-6">
            {tournamentRules.map((section, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <div className="mb-4">
                  <h3 className="text-heading mb-2">{section.title}</h3>
                  <p className="text-body text-medium-gray">{section.description}</p>
                </div>
                <ul className="space-y-2">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start text-sm">
                      <span className="text-bright-red mr-2 mt-1">•</span>
                      <span className="text-medium-gray">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        {/* Technical Specifications */}
        <Section title="Technical Specifications" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            {technicalSpecifications.map((spec, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <h3 className="text-heading mb-4 text-bright-red">{spec.category}</h3>
                <ul className="space-y-2">
                  {spec.specs.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-sm">
                      <span className="text-bright-red mr-2 mt-1">•</span>
                      <span className="text-medium-gray">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Officials & Their Roles */}
        <Section title="Officials & Their Responsibilities" className="mb-8 md:mb-12">
          <Grid cols={3} gap="lg">
            {officials.map((official, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-bright-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👨‍⚖️</span>
                  </div>
                  <h3 className="text-heading text-bright-red">{official.role}</h3>
                </div>
                <ul className="space-y-2">
                  {official.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="flex items-start text-sm">
                      <span className="text-bright-red mr-2 mt-1">•</span>
                      <span className="text-medium-gray">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Downloadable Documents */}
        <Section title="Official Documents" className="mb-8 md:mb-12">
          <Card>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-heading mb-4">Rule Books & Manuals</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📖 Complete Rule Book (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📋 Tournament Regulations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎯 Scoring Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ⚖️ Disciplinary Procedures
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-heading mb-4">Forms & Applications</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📝 Tournament Registration Form
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🏃 Player Eligibility Form
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    👨‍⚖️ Official Application Form
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 Score Sheet Template
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Rule Updates */}
        <Section title="Recent Rule Updates" className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-r from-orange to-bright-red text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Latest Rule Changes (2024)
              </h3>
              <p className="text-lg text-white/90 mb-6">
                Stay updated with the latest rule modifications and interpretations
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">Video Review System</h4>
                  <p className="text-sm text-white/80">Introduced for final rounds of major tournaments</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Substitution Rules</h4>
                  <p className="text-sm text-white/80">Updated to allow tactical substitutions during timeouts</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Service Time</h4>
                  <p className="text-sm text-white/80">Reduced from 8 to 5 seconds for faster gameplay</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Net Height Adjustments</h4>
                  <p className="text-sm text-white/80">Standardized across all age categories</p>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Contact for Clarifications */}
        <Section title="Need Clarification?" className="mb-8 md:mb-12">
          <Card className="text-center">
            <h3 className="text-heading mb-4">Questions About Rules?</h3>
            <p className="text-body mb-6">
              If you need clarification on any rules or have questions about regulations, 
              our technical committee is here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/contact">
                Contact Technical Committee
              </Button>
              <Button variant="outline" href="/media">
                View Video Tutorials
              </Button>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}


