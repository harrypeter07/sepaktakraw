import { Button } from "@/components/ui";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-bright-red to-orange text-white py-12 sm:py-16">
      <div className="container-main text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Get Involved
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          Join the Maharashtra Sepaktakraw Association and be part of promoting this 
          exciting traditional sport across the state.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Button variant="outline" size="lg" href="/districts" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
            Find Your District
          </Button>
          <Button variant="outline" size="lg" href="/contact" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
            Contact Us
          </Button>
          <Button variant="outline" size="lg" href="/media" className="w-full sm:w-auto bg-white text-bright-red hover:bg-white/90 touch-target">
            View Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
