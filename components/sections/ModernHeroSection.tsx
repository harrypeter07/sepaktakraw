"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { formatDateShort } from "@/lib/date-utils";

interface ModernHeroSectionProps {
  recentNotices: Array<{
    id: number;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    published: boolean;
    priority: string;
  }>;
  recentResults: Array<{
    id: number;
    date: string;
    teamA: string;
    teamB: string;
    scoreA: number | null;
    scoreB: number | null;
    venue: string | null;
    published: boolean;
  }>;
  recentElections?: Array<{
    id: number;
    title: string;
    description: string | null;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    published: boolean;
    createdAt: string;
  }>;
}

export function ModernHeroSection({ 
  recentNotices, 
  recentResults, 
  recentElections = [] 
}: ModernHeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    console.log('ModernHeroSection received data:');
    console.log('recentNotices:', recentNotices?.length || 0, 'items');
    console.log('recentResults:', recentResults?.length || 0, 'items');
    console.log('recentElections:', recentElections?.length || 0, 'items');
  }, [recentNotices, recentResults, recentElections]);

  // Combine recent content for sidebar
  const recentContent = [
    ...recentNotices.slice(0, 3).map(notice => ({
      id: notice.id,
      title: notice.title,
      category: notice.category,
      date: notice.createdAt,
      href: `/notices/${notice.id}`,
      priority: notice.priority === "HIGH" ? "HIGH" as const : "NORMAL" as const
    })),
    ...recentResults.slice(0, 2).map(result => ({
      id: result.id + 1000,
      title: `${result.teamA} vs ${result.teamB}`,
      category: "Match Result",
      date: result.date,
      href: `/results`,
      priority: "NORMAL" as const
    })),
    ...recentElections.slice(0, 1).map(election => ({
      id: election.id + 2000,
      title: election.title,
      category: "Election",
      date: election.createdAt,
      href: `/elections/${election.id}`,
      priority: "HIGH" as const
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  console.log('Combined recentContent:', recentContent.length, 'items');
  console.log('recentContent details:', recentContent);

  return (
    <section 
      role="banner" 
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-100 overflow-hidden"
    >
      {/* Hero Container */}
      <div className="relative z-10 px-2 sm:px-3 lg:px-4 py-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-2.5 items-start min-h-[60vh]">
            
            {/* First Column - Sepaktakraw Info (3 columns on desktop, full width on mobile/tablet) */}
            <div className={`lg:col-span-3 order-1 transition-all duration-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 lg:p-4 shadow-lg h-full border border-gray-200">
                <div className="text-center mb-4 lg:mb-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase mb-3 lg:mb-4">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Official Association
                  </div>

                  {/* H1 */}
                  <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-800 leading-tight mb-2 lg:mb-3">
                    Maharashtra Sepaktakraw Association
                  </h1>

                  {/* Supporting Paragraph */}
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 lg:mb-6">
                    Promoting excellence in sepaktakraw across Maharashtra through tournaments, training, and community development.
                  </p>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-lg p-3 lg:p-4 mb-3 lg:mb-4">
                      <div className="text-xl lg:text-2xl font-bold text-orange-600">2024</div>
                      <div className="text-xs lg:text-sm text-gray-600">Championship Year</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 lg:gap-3 text-center">
                    <div className="bg-gray-50 rounded-lg p-2 lg:p-3">
                      <div className="text-base lg:text-lg font-bold text-gray-800">15+</div>
                      <div className="text-xs text-gray-600">Districts</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 lg:p-3">
                      <div className="text-base lg:text-lg font-bold text-gray-800">500+</div>
                      <div className="text-xs text-gray-600">Players</div>
                    </div>
                  </div>

                  <div className="pt-3 lg:pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Link
                        href="/results"
                        className="inline-flex items-center justify-center h-8 lg:h-10 px-4 lg:px-6 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 hover:shadow-md transition-all duration-200 text-xs lg:text-sm"
                      >
                        View Events
                      </Link>
                      <Link
                        href="/districts"
                        className="inline-flex items-center justify-center h-8 lg:h-10 px-4 lg:px-6 border-2 border-orange-500 text-orange-500 font-semibold rounded-md hover:bg-orange-500 hover:text-white transition-all duration-200 text-xs lg:text-sm"
                      >
                        Explore Districts
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Column - Hero Image (6 columns - largest on desktop, full width on mobile/tablet) */}
            <div className={`lg:col-span-6 order-2 transition-all duration-300 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}>
              <div className="relative group">
                {/* Main Image Card */}
                <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center"
                    alt="Maharashtra Sepaktakraw team celebrating victory at national championship"
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    fallback="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center"
                    placeholder="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=75&fit=crop&crop=center&blur=20"
                    quality={90}
                    format="webp"
                    responsive={true}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  
                  {/* Medal Badge Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Gold • National 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Column - Events & Notices (3 columns - thinnest on desktop, full width on mobile/tablet) */}
            <div className={`lg:col-span-3 order-3 transition-all duration-300 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}>
              {recentContent.length > 0 && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 lg:p-4 shadow-lg h-full border border-gray-200">
                  <div className="flex items-center gap-2 mb-3 lg:mb-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <h3 className="font-bold text-gray-800 text-sm lg:text-base tracking-wide uppercase">Latest News & Notices</h3>
                  </div>
                  
                  <div className="space-y-2 lg:space-y-3">
                    {recentContent.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block group"
                      >
                        <div className="flex items-start gap-2 p-2 rounded-md hover:bg-orange-50 transition-colors duration-200 border border-gray-100 hover:border-orange-200">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            item.priority === "HIGH" ? "bg-red-500" : "bg-blue-500"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-1">
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                item.priority === "HIGH" 
                                  ? "bg-red-100 text-red-800" 
                                  : "bg-orange-100 text-orange-800"
                              }`}>
                                {item.category}
                              </span>
                              {item.priority === "HIGH" && (
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  URGENT
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDateShort(item.date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 lg:mt-4 pt-2 lg:pt-3 border-t border-gray-200">
                    <Link 
                      href="/notices" 
                      className="flex items-center justify-center gap-1 text-blue-600 hover:text-orange-600 font-medium text-xs transition-colors"
                    >
                      View All News & Notices
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
