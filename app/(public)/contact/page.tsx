import Link from "next/link";
import Image from "next/image";
import { Button, Card, Section, Grid, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Label } from "@/components/ui";

export default function ContactPage() {
  const subjectOptions = [
    { value: "", label: "Select a subject" },
    { value: "general", label: "General Inquiry" },
    { value: "tournament", label: "Tournament Information" },
    { value: "membership", label: "Membership" },
    { value: "training", label: "Training Programs" },
    { value: "complaint", label: "Complaint" },
    { value: "other", label: "Other" }
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
          <h1 className="text-display text-dark-gray mb-3 md:mb-4">Contact Us</h1>
          <p className="text-lead">
            Get in touch with the Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Contact Information */}
        <Grid cols={2} gap="lg" className="mb-8 md:mb-12">
          {/* Main Office */}
          <Card>
            <h2 className="text-heading mb-4">Main Office</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm">Address</div>
                  <div className="text-small">Maharashtra Sepaktakraw Association<br />
                    Sports Complex, Shivaji Park<br />
                    Mumbai, Maharashtra 400016</div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm">Email</div>
                  <div className="text-small">info@mskt.org</div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm">Phone</div>
                  <div className="text-small">+91-98765-43210</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Office Hours */}
          <Card>
            <h2 className="text-heading mb-4">Office Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-small">Monday - Friday</span>
                <span className="font-medium text-dark-gray text-sm">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-small">Saturday</span>
                <span className="font-medium text-dark-gray text-sm">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-small">Sunday</span>
                <span className="font-medium text-dark-gray text-sm">Closed</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange/10 border border-orange/20 rounded-lg">
              <div className="text-xs text-orange">
                <strong>Note:</strong> For urgent matters outside office hours, please email us and we'll respond within 24 hours.
              </div>
            </div>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Card className="mb-8 md:mb-12">
          <h2 className="text-heading mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <Grid cols={2} gap="lg">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </Grid>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                rows={5}
                placeholder="Please describe your inquiry or message..."
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-small text-medium-gray">
                * Required fields
              </div>
              <Button type="submit" variant="primary">
                Send Message
              </Button>
            </div>
          </form>
        </Card>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-bright-red to-orange text-white rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-white/90 mb-6 text-sm md:text-base">
            For urgent matters or tournament-related queries, you can also contact your district officials directly.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Button
              variant="outline"
              href="/districts"
            >
              Find District Officials
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
