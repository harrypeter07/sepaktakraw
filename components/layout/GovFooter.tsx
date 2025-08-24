import Image from "next/image";

export function GovFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white shadow-sm">
      <div className="container-content py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <div className="text-sm text-medium-gray">
              <div className="font-semibold text-dark-gray">© {new Date().getFullYear()} Maharashtra Sepaktakraw Association</div>
              <div className="text-xs text-medium-gray mt-1">Official Sports Federation Portal</div>
            </div>
          </div>

          <div className="text-sm text-medium-gray text-center md:text-right">
            <div className="font-medium text-dark-gray">For accessibility support, email contact@mskt.in</div>
            <div className="text-xs text-medium-gray mt-1">
              Promoting Sepaktakraw across Maharashtra
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


