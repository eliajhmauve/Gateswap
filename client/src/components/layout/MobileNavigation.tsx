import { Link } from "wouter";

interface MobileNavigationProps {
  currentPath: string;
}

export default function MobileNavigation({ currentPath }: MobileNavigationProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-3">
        <Link href="/swap">
          <a className={`flex flex-col items-center ${currentPath === "/swap" ? "text-primary" : "text-gray-400"}`}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
            <span className="text-xs mt-1">Swap</span>
          </a>
        </Link>
        
        <Link href="/portfolio">
          <a className={`flex flex-col items-center ${currentPath === "/portfolio" ? "text-primary" : "text-gray-400"}`}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="8 12 12 16 16 12"></polyline>
              <line x1="12" y1="8" x2="12" y2="16"></line>
            </svg>
            <span className="text-xs mt-1">Portfolio</span>
          </a>
        </Link>
        
        <a href="#" className="flex flex-col items-center text-gray-400">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span className="text-xs mt-1">History</span>
        </a>
      </div>
    </div>
  );
}
