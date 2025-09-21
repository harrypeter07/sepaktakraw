"use client";

export function LogoStrip() {
  const logos = [
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center",
      alt: "Maharashtra Sepaktakraw Association",
      name: "MSKT"
    },
    {
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=100&fit=crop&crop=center",
      alt: "Sports Authority of India",
      name: "SAI"
    },
    {
      src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=100&fit=crop&crop=center",
      alt: "Government of Maharashtra",
      name: "GoM"
    },
    {
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=100&fit=crop&crop=center",
      alt: "Indian Olympic Association",
      name: "IOA"
    },
    {
      src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center",
      alt: "Asian Games Federation",
      name: "AGF"
    },
    {
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=100&fit=crop&crop=center",
      alt: "International Sepaktakraw Federation",
      name: "ISTAF"
    }
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 group"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 sm:h-12 opacity-60 hover:opacity-100 transition-opacity duration-200 filter grayscale hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs sm:text-sm font-semibold text-gray-600 px-3 py-1 bg-gray-100 rounded-md">${logo.name}</span>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
