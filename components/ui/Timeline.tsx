"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  event: string;
  description: string;
  status?: "completed" | "current" | "upcoming";
  icon?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const getCurrentStatus = (date: string) => {
    const today = new Date();
    const itemDate = new Date(date);
    
    if (itemDate < today) return "completed";
    if (itemDate.toDateString() === today.toDateString()) return "current";
    return "upcoming";
  };

  const getTooltipPosition = (index: number, totalItems: number) => {
    // Calculate if tooltip should appear above or below
    const shouldShowAbove = true; // Always show above for this design
    
    // Calculate horizontal positioning to keep within window
    let horizontalPosition = "left-1/2 transform -translate-x-1/2";
    
    // For first few items, ensure tooltip doesn't go off left edge
    if (index < 2) {
      horizontalPosition = "left-0 transform translate-x-2";
    }
    
    // For last few items, ensure tooltip doesn't go off right edge
    if (index >= totalItems - 2) {
      horizontalPosition = "right-0 transform -translate-x-2";
    }
    
    return {
      position: shouldShowAbove ? "bottom-full mb-4" : "top-full mt-4",
      horizontal: horizontalPosition,
      arrowPosition: shouldShowAbove ? "top-full" : "bottom-full"
    };
  };

  return (
    <div className={cn("relative", className)}>
      {/* Horizontal Timeline Container */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div 
            className="h-1 bg-gradient-to-r from-bright-red to-orange rounded-full transition-all duration-500"
            style={{ 
              width: `${(items.filter(item => getCurrentStatus(item.date) === "completed").length / items.length) * 100}%` 
            }}
          ></div>
        </div>

        {/* Timeline Items */}
        <div className="flex justify-between items-start relative">
          {items.map((item, index) => {
            const status = item.status || getCurrentStatus(item.date);
            const isCompleted = status === "completed";
            const isCurrent = status === "current";
            
            return (
              <div key={index} className="relative flex flex-col items-center group">
                {/* Timeline Circle */}
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative z-10",
                  isCompleted && "bg-bright-red border-bright-red shadow-lg",
                  isCurrent && "bg-orange border-orange shadow-lg animate-pulse",
                  !isCompleted && !isCurrent && "bg-white border-gray-300"
                )}>
                  {isCompleted ? (
                    <span className="text-white text-lg font-bold">✓</span>
                  ) : isCurrent ? (
                    <span className="text-white text-lg font-bold">●</span>
                  ) : (
                    <span className="text-gray-400 text-lg font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Event Name - Complete Display */}
                <div className="mt-4 text-center max-w-32">
                  <div className={cn(
                    "text-xs font-semibold leading-tight",
                    isCompleted && "text-green-700",
                    isCurrent && "text-orange-700",
                    !isCompleted && !isCurrent && "text-gray-600"
                  )}>
                    {item.event}
                  </div>
                  
                  {/* Date */}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>

                {/* Hover Tooltip with Full Details */}
                {(() => {
                  const tooltipPos = getTooltipPosition(index, items.length);
                  return (
                    <div className={cn(
                      "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20",
                      tooltipPos.position,
                      tooltipPos.horizontal
                    )}>
                                             <div className="bg-dark-gray text-white p-4 rounded-none shadow-xl max-w-xs relative border border-gray-600">
                        {/* Arrow */}
                        <div className={cn(
                          "absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-gray",
                          tooltipPos.arrowPosition,
                          tooltipPos.horizontal.includes("left-1/2") ? "left-1/2 transform -translate-x-1/2" : 
                          tooltipPos.horizontal.includes("left-0") ? "left-4" : "right-4"
                        )}></div>
                        
                        {/* Content */}
                        <div className="text-center">
                          <div className="text-sm font-semibold mb-2">{item.event}</div>
                          <div className="text-xs text-gray-300 mb-2">
                            {new Date(item.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-xs leading-relaxed">{item.description}</div>
                          
                          {/* Status Badge */}
                          <div className="mt-2">
                            {isCurrent && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                                CURRENT
                              </span>
                            )}
                            {isCompleted && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                COMPLETED
                              </span>
                            )}
                            {!isCompleted && !isCurrent && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                                UPCOMING
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Progress Summary */}
      <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-dark-gray">Overall Election Progress</h4>
          <span className="text-sm font-semibold text-bright-red">
            {Math.round((items.filter(item => getCurrentStatus(item.date) === "completed").length / items.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-bright-red to-orange h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${(items.filter(item => getCurrentStatus(item.date) === "completed").length / items.length) * 100}%` 
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Started</span>
          <span>In Progress</span>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}
