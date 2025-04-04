import { Link } from "wouter";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="bg-glow top-0 left-0"></div>
      <div className="bg-glow bottom-0 right-0"></div>
      
      <div className="glass-card p-8 md:p-10 w-full max-w-md animate-border-glow">
        <div className="text-center mb-8">
          <svg className="w-20 h-20 mx-auto mb-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Mission Complete!</h1>
          <p className="text-gray-300 text-lg mb-6">
            🎉 You have successfully completed the GateSwap mission!
          </p>
          
          <div className="glass p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold mb-2">Your achievements:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified your identity with Self Protocol
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Successfully executed a token swap
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <Link href="/swap">
              <a className="glass-card py-2.5 px-4 rounded-lg text-center transition-colors hover:bg-gray-700 flex-1">
                Continue Swapping
              </a>
            </Link>
            <Link href="/portfolio">
              <a className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-2.5 px-4 transition-all duration-300 flex-1 text-center">
                View Portfolio
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}