import { useWallet } from "@/lib/useWallet";
import { Link } from "wouter";

export default function Header() {
  const { isConnected, address, connectWallet } = useWallet();

  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">GateSwap</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/swap">
              <a className="text-gray-200 hover:text-white font-medium">Swap</a>
            </Link>
            <Link href="/portfolio">
              <a className="text-gray-400 hover:text-white">Portfolio</a>
            </Link>
            <a href="#" className="text-gray-400 hover:text-white">History</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-green-900 bg-opacity-30 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-green-400 text-sm font-medium">Verified</span>
          </div>
          
          {isConnected ? (
            <button className="glass-card py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors">
              <img 
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/eth.png"
                alt="ETH" 
                className="w-5 h-5" 
              />
              <span className="font-medium">{address}</span>
            </button>
          ) : (
            <button 
              onClick={connectWallet}
              className="glass-card py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
