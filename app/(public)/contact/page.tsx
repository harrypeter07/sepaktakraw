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
    <div className="min-h-screen bg-off-white py-6 sm:py-8 md:py-12">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={60} 
              height={60}
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-gray mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Get in touch with the Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Contact Information - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12">
          {/* Main Office */}
          <Card className="mobile-card">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-dark-gray mb-4">Main Office</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm sm:text-base mb-1">Address</div>
                  <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Maharashtra Sepaktakraw Association<br />
                    Sports Complex, Shivaji Park<br />
                    Mumbai, Maharashtra 400016
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm sm:text-base mb-1">Email</div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <a href="mailto:info@mskt.org" className="text-bright-red hover:text-red-700 underline decoration-2 underline-offset-2">
                      info@mskt.org
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-bright-red mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <div className="font-semibold text-dark-gray text-sm sm:text-base mb-1">Phone</div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <a href="tel:+919876543210" className="text-bright-red hover:text-red-700 underline decoration-2 underline-offset-2">
                      +91-98765-43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Office Hours */}
          <Card className="mobile-card">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-dark-gray mb-4">Office Hours</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-700">Monday - Friday</span>
                <span className="font-medium text-dark-gray text-sm sm:text-base">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-700">Saturday</span>
                <span className="font-medium text-dark-gray text-sm sm:text-base">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm sm:text-base text-gray-700">Sunday</span>
                <span className="font-medium text-dark-gray text-sm sm:text-base">Closed</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange/10 border border-orange/20 rounded-lg">
              <div className="text-xs sm:text-sm text-orange-800">
                <strong>Note:</strong> For urgent matters outside office hours, please email us and we'll respond within 24 hours.
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form - Mobile Optimized */}
        <Card className="mobile-card">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-dark-gray mb-4 sm:mb-6">Send us a Message</h2>
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm sm:text-base font-medium text-dark-gray">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mobile-form-input"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm sm:text-base font-medium text-dark-gray">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mobile-form-input"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base font-medium text-dark-gray">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mobile-form-input"
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base font-medium text-dark-gray">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="mobile-form-input"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm sm:text-base font-medium text-dark-gray">
                Subject *
              </Label>
              <Select name="subject" required>
                <SelectTrigger className="mobile-form-input">
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
              <Label htmlFor="message" className="text-sm sm:text-base font-medium text-dark-gray">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                className="mobile-form-input resize-vertical"
                placeholder="Enter your message here..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium touch-target"
              >
                Send Message
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium touch-target"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </Card>

        {/* Additional Contact Methods */}
        <div className="mt-8 sm:mt-12">
          <Card className="mobile-card">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-dark-gray mb-4 sm:mb-6 text-center">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-bright-red/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-bright-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark-gray mb-2">Email Support</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Get a response within 24 hours
                </p>
                <a 
                  href="mailto:support@mskt.org" 
                  className="text-bright-red hover:text-red-700 font-medium text-sm sm:text-base underline decoration-2 underline-offset-2"
                >
                  support@mskt.org
                </a>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark-gray mb-2">Phone Support</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Call during office hours
                </p>
                <a 
                  href="tel:+919876543210" 
                  className="text-orange hover:text-orange-700 font-medium text-sm sm:text-base underline decoration-2 underline-offset-2"
                >
                  +91-98765-43210
                </a>
              </div>

              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark-gray mb-2">Visit Us</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  Drop by our office
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  Sports Complex, Shivaji Park<br />
                  Mumbai, Maharashtra 400016
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
