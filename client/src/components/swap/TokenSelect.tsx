import { useState } from "react";
import { useWallet } from "@/lib/useWallet";

interface TokenSelectProps {
  selectedToken: string;
  onSelect: (token: string) => void;
}

export default function TokenSelect({ selectedToken, onSelect }: TokenSelectProps) {
  const { tokens } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (token: string) => {
    onSelect(token);
    setIsOpen(false);
  };

  const selectedTokenData = tokens[selectedToken];

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 glass rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={selectedTokenData?.icon} 
          alt={selectedTokenData?.symbol} 
          className="w-6 h-6" 
        />
        <span className="font-medium">{selectedTokenData?.symbol}</span>
        <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover backdrop-blur-lg border border-white/10 z-50">
          <div className="py-1">
            {Object.entries(tokens).map(([symbol, token]) => (
              <button
                key={symbol}
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                onClick={() => handleSelect(symbol)}
              >
                <img 
                  src={token.icon} 
                  alt={token.symbol} 
                  className="w-5 h-5 mr-2" 
                />
                <span className="font-medium">{token.symbol}</span>
                <span className="ml-2 text-xs text-gray-400">{token.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
