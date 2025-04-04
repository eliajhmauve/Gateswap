import { useState } from "react";
import { useWallet } from "@/lib/useWallet";
import TokenSelect from "./TokenSelect";
import SwapDetailsCard from "./SwapDetailsCard";
import { queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

export default function SwapCard() {
  const { tokens, getBalance } = useWallet();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Exchange rate data (in a real implementation this would come from an API)
  const exchangeRate = 1805.42; // 1 ETH = 1805.42 USDC

  // Calculate estimated output amount
  const estimatedOutput = amount && !isNaN(parseFloat(amount)) 
    ? (parseFloat(amount) * exchangeRate).toFixed(2) 
    : "0.0";

  const handleSwapDirections = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the API
      // const response = await fetch(`/api/quote?fromToken=${fromToken}&toToken=${toToken}&amount=${amount}`);
      // const data = await response.json();
      
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Swap</h2>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        
        {/* From Token */}
        <div className="glass-input rounded-lg p-4 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">From</span>
            <span className="text-sm text-gray-400">
              Balance: {getBalance(fromToken as any)} {fromToken}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-xl font-medium w-2/3 focus:outline-none" 
            />
            
            <TokenSelect 
              selectedToken={fromToken}
              onSelect={setFromToken}
            />
          </div>
        </div>
        
        {/* Swap Direction Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button 
            onClick={handleSwapDirections}
            className="bg-surface p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
        
        {/* To Token */}
        <div className="glass-input rounded-lg p-4 mt-2 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">To (estimated)</span>
            <span className="text-sm text-gray-400">
              Balance: {getBalance(toToken as any)} {toToken}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <input 
              type="number" 
              placeholder="0.0" 
              value={estimatedOutput === "0.0" ? "" : estimatedOutput}
              disabled
              className="bg-transparent text-xl font-medium w-2/3 focus:outline-none" 
            />
            
            <TokenSelect 
              selectedToken={toToken}
              onSelect={setToToken}
            />
          </div>
        </div>
        
        {/* Exchange Rate */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>Exchange Rate</span>
          <span>1 {fromToken} = {exchangeRate} {toToken}</span>
        </div>
        
        <button 
          onClick={handleGetQuote}
          disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Get Quote"}
        </button>
      </div>
      
      {showDetails && (
        <SwapDetailsCard 
          fromToken={fromToken}
          toToken={toToken}
          amount={parseFloat(amount)}
          estimatedOutput={parseFloat(estimatedOutput)}
        />
      )}
    </div>
  );
}
