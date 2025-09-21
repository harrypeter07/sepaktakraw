"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Badge } from "@/components/ui";

interface HeroImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  href: string;
  priority?: "HIGH" | "NORMAL";
}

interface HeroSectionProps {
  recentNotices: any[];
  recentResults: any[];
  recentElections?: any[];
}

export function HeroSection({ recentNotices, recentResults, recentElections = [] }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero images - you can replace these with actual images
  const heroImages: HeroImage[] = [
    {
      id: 1,
      src: "/hero-sepaktakraw-1.jpg",
      alt: "Sepaktakraw players in action",
      title: "Maharashtra Sepaktakraw Championship 2024",
      description: "Witness the best players compete for the state championship title"
    },
    {
      id: 2,
      src: "/hero-sepaktakraw-2.jpg",
      alt: "Youth training session",
      title: "Youth Development Program",
      description: "Nurturing the next generation of sepaktakraw champions"
    },
    {
      id: 3,
      src: "/hero-sepaktakraw-3.jpg",
      alt: "Women's sepaktakraw team",
      title: "Women's Sepaktakraw League",
      description: "Empowering women through sports and competition"
    },
    {
      id: 4,
      src: "/hero-sepaktakraw-4.jpg",
      alt: "International tournament",
      title: "International Recognition",
      description: "Maharashtra players representing India on the global stage"
    }
  ];

  // Combine recent notices, results, and elections into news items
  const newsItems: NewsItem[] = [
    ...recentNotices.slice(0, 3).map(notice => ({
      id: notice.id,
      title: notice.title,
      category: notice.category,
      date: notice.createdAt,
      href: `/notices/${notice.id}`,
      priority: notice.priority === "HIGH" ? "HIGH" as const : "NORMAL" as const
    })),
    ...recentResults.slice(0, 2).map(result => ({
      id: result.id + 1000, // Offset to avoid ID conflicts
      title: `${result.teamA} vs ${result.teamB}`,
      category: "Match Result",
      date: result.date,
      href: `/results`,
      priority: "NORMAL" as const
    })),
    ...recentElections.slice(0, 1).map(election => ({
      id: election.id + 2000, // Offset to avoid ID conflicts
      title: election.title,
      category: "Election",
      date: election.createdAt,
      href: `/elections/${election.id}`,
      priority: "HIGH" as const
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentImage = heroImages[currentImageIndex];

  return (
    <section className="bg-gradient-to-br from-bright-red via-orange to-yellow-400 py-12 md:py-16">
      <div className="container-content">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Sidebar - News & Updates */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-bright-red rounded-full animate-pulse"></div>
                  <h2 className="text-heading font-bold">Latest Updates</h2>
                </div>
                
                <div className="space-y-4">
                  {newsItems.length > 0 ? (
                    newsItems.map((item, index) => (
                      <div key={item.id} className="group">
                        <Link href={item.href} className="block">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                item.priority === "HIGH" ? "bg-red-500" : "bg-blue-500"
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge 
                                  variant={item.priority === "HIGH" ? "primary" : "secondary"} 
                                  size="sm"
                                >
                                  {item.category}
                                </Badge>
                                {item.priority === "HIGH" && (
                                  <Badge variant="primary" size="sm">URGENT</Badge>
                                )}
                              </div>
                              <h3 className="text-sm font-medium text-dark-gray line-clamp-2 group-hover:text-bright-red transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-medium-gray mt-1">
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                        {index < newsItems.length - 1 && (
                          <div className="border-b border-gray-100 mx-3"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">No updates available</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link 
                    href="/notices" 
                    className="flex items-center justify-center gap-2 text-bright-red hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    View All Updates
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Hero Image Carousel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                {/* Image Container */}
                <div className="relative h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* Placeholder for actual images - you can replace this with real images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-bright-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-bright-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-dark-gray mb-2">
                        {currentImage.title}
                      </h3>
                      <p className="text-medium-gray">
                        {currentImage.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentImageIndex(
                      currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(
                      currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Content Below Image */}
                <div className="p-6">
                  <div className="text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
                      Maharashtra Sepaktakraw Association
                    </h1>
                    <p className="text-lead text-medium-gray mb-6">
                      Official portal for results, notices, districts, elections, and compliance
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link
                        href="/results"
                        className="btn-primary"
                      >
                        View Results
                      </Link>
                      <Link
                        href="/districts"
                        className="btn-secondary"
                      >
                        Explore Districts
                      </Link>
                      <Link
                        href="/elections"
                        className="btn-outline"
                      >
                        Elections
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
