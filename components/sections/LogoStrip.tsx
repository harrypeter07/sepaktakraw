"use client";

export function LogoStrip() {
  const logos = [
    {
      src: "/logo-mskt.svg",
      alt: "Maharashtra Sepaktakraw Association",
      name: "MSKT"
    },
    {
      src: "/logo-sports-authority.svg",
      alt: "Sports Authority of India",
      name: "SAI"
    },
    {
      src: "/logo-government.svg",
      alt: "Government of Maharashtra",
      name: "GoM"
    },
    {
      src: "/logo-olympic.svg",
      alt: "Indian Olympic Association",
      name: "IOA"
    },
    {
      src: "/logo-asiad.svg",
      alt: "Asian Games Federation",
      name: "AGF"
    },
    {
      src: "/logo-istaf.svg",
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
