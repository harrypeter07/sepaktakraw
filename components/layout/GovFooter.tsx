import Image from "next/image";

export function GovFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <div className="text-sm text-gray-600">
              <div>© {new Date().getFullYear()} Maharashtra Sepaktakraw Association</div>
              <div className="text-xs text-gray-500">Official Sports Federation Portal</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 text-center md:text-right">
            <div>For accessibility support, email contact@mskt.in</div>
            <div className="text-xs text-gray-500 mt-1">
              Promoting Sepaktakraw across Maharashtra
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


