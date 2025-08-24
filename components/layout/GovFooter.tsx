import Image from "next/image";

export function GovFooter() {
  return (
    <footer className="border-t border-medium-gray bg-white">
      <div className="container-content py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <div className="text-sm text-medium-gray">
              <div>© {new Date().getFullYear()} Maharashtra Sepaktakraw Association</div>
              <div className="text-xs text-medium-gray mt-1">Official Sports Federation Portal</div>
            </div>
          </div>
          
          <div className="text-sm text-medium-gray text-center md:text-right">
            <div>For accessibility support, email contact@mskt.in</div>
            <div className="text-xs text-medium-gray mt-1">
              Promoting Sepaktakraw across Maharashtra
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


