"use client";

import { useState } from "react";
import { getOptimizedImageUrl, getResponsiveImageUrls } from "@/lib/images";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  className?: string;
  priority?: boolean;
  placeholder?: string;
  fallback?: string;
  sizes?: string;
  responsive?: boolean;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'webp',
  fit = 'cover',
  className = "",
  priority = false,
  placeholder,
  fallback,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  responsive = true,
  lazy = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate optimized URL
  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    format,
    fit
  });

  // Generate responsive URLs if needed
  const responsiveUrls = responsive ? getResponsiveImageUrls(src, {
    sm: { width: 640, height },
    md: { width: 768, height },
    lg: { width: 1024, height },
    xl: { width: 1280, height },
    '2xl': { width: 1536, height }
  }) : {};

  // Generate srcSet for responsive images
  const srcSet = responsive ? Object.entries(responsiveUrls)
    .map(([size, url]) => {
      const width = size === 'sm' ? 640 : 
                   size === 'md' ? 768 : 
                   size === 'lg' ? 1024 : 
                   size === 'xl' ? 1280 : 1536;
      return `${url} ${width}w`;
    })
    .join(', ') : undefined;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Use fallback image if error
  const finalSrc = hasError && fallback ? fallback : optimizedSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <img src={placeholder} alt="" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          )}
        </div>
      )}

      {/* Main image */}
      <img
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        srcSet={srcSet}
        sizes={sizes}
        loading={lazy && !priority ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Preset components for common use cases
export function AvatarImage({ src, alt, size = 40, className = "", ...props }: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={90}
      fit="cover"
      className={`rounded-full ${className}`}
      fallback="/default-avatar.png"
      {...props}
    />
  );
}

export function HeroImage({ src, alt, className = "", ...props }: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      quality={85}
      format="webp"
      fit="cover"
      responsive={true}
      priority={true}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}

export function ThumbnailImage({ src, alt, className = "", ...props }: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={200}
      quality={75}
      format="webp"
      fit="cover"
      responsive={true}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}

export function CardImage({ src, alt, className = "", ...props }: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={250}
      quality={80}
      format="webp"
      fit="cover"
      responsive={true}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}
