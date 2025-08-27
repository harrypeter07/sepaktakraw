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

  return (
    <div className={cn("relative", className)}>
      {/* Progress Bar */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bright-red via-orange to-bright-red opacity-20"></div>
      </div>

      <div className="space-y-8">
        {items.map((item, index) => {
          const status = item.status || getCurrentStatus(item.date);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";
          
          return (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline Dot */}
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
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
                
                {/* Connection Line */}
                {index < items.length - 1 && (
                  <div className={cn(
                    "absolute left-1/2 top-12 w-0.5 h-8 -translate-x-1/2",
                    isCompleted ? "bg-bright-red" : "bg-gray-200"
                  )}></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "p-6 rounded-xl border-2 transition-all duration-300",
                  isCompleted && "bg-green-50 border-green-200 shadow-md",
                  isCurrent && "bg-orange-50 border-orange-200 shadow-lg",
                  !isCompleted && !isCurrent && "bg-white border-gray-200"
                )}>
                  {/* Date Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      isCompleted && "bg-green-100 text-green-800",
                      isCurrent && "bg-orange-100 text-orange-800",
                      !isCompleted && !isCurrent && "bg-gray-100 text-gray-600"
                    )}>
                      {new Date(item.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    
                    {isCurrent && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full animate-pulse">
                        CURRENT
                      </span>
                    )}
                    
                    {isCompleted && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <h3 className={cn(
                    "text-lg font-bold mb-2",
                    isCompleted && "text-green-800",
                    isCurrent && "text-orange-800",
                    !isCompleted && !isCurrent && "text-dark-gray"
                  )}>
                    {item.event}
                  </h3>

                  {/* Description */}
                  <p className={cn(
                    "text-sm leading-relaxed",
                    isCompleted && "text-green-700",
                    isCurrent && "text-orange-700",
                    !isCompleted && !isCurrent && "text-medium-gray"
                  )}>
                    {item.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          isCompleted && "bg-green-500 w-full",
                          isCurrent && "bg-orange-500 w-3/4",
                          !isCompleted && !isCurrent && "bg-gray-300 w-0"
                        )}></div>
                      </div>
                      <span className={cn(
                        "text-xs font-semibold",
                        isCompleted && "text-green-600",
                        isCurrent && "text-orange-600",
                        !isCompleted && !isCurrent && "text-gray-400"
                      )}>
                        {isCompleted ? "100%" : isCurrent ? "75%" : "0%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
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
