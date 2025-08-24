import Link from "next/link";
import Image from "next/image";
import { Button, Card, Section, Grid, FormInput, FormSelect, FormTextarea } from "@/components/ui";

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
    <div className="min-h-screen bg-off-white py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={80} 
              height={80}
              className="w-20 h-20"
            />
          </div>
          <h1 className="text-hero text-dark-gray mb-4">Contact Us</h1>
          <p className="text-subtitle">
            Get in touch with the Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Contact Information */}
        <Grid cols={2} gap="lg" className="mb-12">
          {/* Main Office */}
          <Card>
            <h2 className="section-subheader">Main Office</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-bright-red mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-dark-gray">Address</div>
                  <div className="text-medium-gray">Maharashtra Sepaktakraw Association<br />
                  Sports Complex, Shivaji Park<br />
                  Mumbai, Maharashtra 400016</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 text-bright-red mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <div className="font-medium text-dark-gray">Email</div>
                  <div className="text-medium-gray">info@mskt.org</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 text-bright-red mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <div className="font-medium text-dark-gray">Phone</div>
                  <div className="text-medium-gray">+91-98765-43210</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Office Hours */}
          <Card>
            <h2 className="section-subheader">Office Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-medium-gray">Monday - Friday</span>
                <span className="font-medium text-dark-gray">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Saturday</span>
                <span className="font-medium text-dark-gray">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medium-gray">Sunday</span>
                <span className="font-medium text-dark-gray">Closed</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-off-white rounded-lg">
              <div className="text-sm text-bright-red">
                <strong>Note:</strong> For urgent matters outside office hours, please email us and we'll respond within 24 hours.
              </div>
            </div>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Card className="mb-12">
          <h2 className="section-subheader">Send us a Message</h2>
          <form className="space-y-6">
            <Grid cols={2} gap="lg">
              <FormInput
                label="First Name"
                required
                placeholder="Enter your first name"
              />
              <FormInput
                label="Last Name"
                required
                placeholder="Enter your last name"
              />
            </Grid>
            
            <FormInput
              label="Email Address"
              type="email"
              required
              placeholder="Enter your email address"
            />
            
            <FormSelect
              label="Subject"
              required
              options={subjectOptions}
            />
            
            <FormTextarea
              label="Message"
              required
              rows={5}
              placeholder="Please describe your inquiry or message..."
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-medium-gray">
                * Required fields
              </div>
              <Button type="submit" variant="primary">
                Send Message
              </Button>
            </div>
          </form>
        </Card>

        {/* Additional Information */}
        <div className="bg-bright-red text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-white mb-6">
            For urgent matters or tournament-related queries, you can also contact your district officials directly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
