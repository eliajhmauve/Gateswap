import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTaskProgress } from "@/lib/useTaskProgress";
import { useWallet } from "@/lib/useWallet";
import { apiRequest } from "@/lib/queryClient";

interface SwapDetailsCardProps {
  fromToken: string;
  toToken: string;
  amount: number;
  estimatedOutput: number;
}

export default function SwapDetailsCard({ 
  fromToken, 
  toToken, 
  amount, 
  estimatedOutput 
}: SwapDetailsCardProps) {
  const { setTaskCompleted } = useTaskProgress();
  const { address } = useWallet();
  const [isSwapping, setIsSwapping] = useState(false);
  
  // Calculate minimum received (with 1% slippage)
  const minReceived = (estimatedOutput * 0.99).toFixed(2);
  
  // Swap parameters
  const priceImpact = "0.08%";
  const lpFee = (estimatedOutput * 0.0003).toFixed(2); // 0.03% fee
  const gasEstimate = "~$12.45";

  const handleSwap = async () => {
    setIsSwapping(true);
    
    try {
      // Simulate swap execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Record swap details to server when user has a wallet address
      if (address) {
        try {
          // Call API to complete the task
          await apiRequest("/api/complete-task", "POST", { 
            walletAddress: address,
            fromToken,
            toToken,
            amount,
            estimatedOutput
          });
        } catch (apiError) {
          console.error("Failed to record swap completion:", apiError);
          // Continue with local updates even if the API call fails
        }
      }
      
      // Mark task as completed in the task progress context
      setTaskCompleted(true);
      
      // Store swap details in localStorage for demo purposes
      const swapHistory = JSON.parse(localStorage.getItem("swapHistory") || "[]");
      swapHistory.push({
        fromToken,
        toToken,
        amount,
        estimatedOutput,
        timestamp: new Date().toISOString(),
        txHash: "0x" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
      });
      localStorage.setItem("swapHistory", JSON.stringify(swapHistory));
      
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Swap Details</h3>
      
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <Tooltip text="This is the minimum amount you'll receive after slippage - the worst case scenario for your trade.">
            <div className="flex items-center">
              <span>Minimum Received</span>
              <svg className="w-4 h-4 text-gray-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </Tooltip>
          <span>{minReceived} {toToken}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <Tooltip text="The difference between the market price and estimated price due to trade size.">
            <div className="flex items-center">
              <span>Price Impact</span>
              <svg className="w-4 h-4 text-gray-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </Tooltip>
          <span className="text-green-500">{priceImpact}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <Tooltip text="A fee paid to liquidity providers that is already included in the quote.">
            <div className="flex items-center">
              <span>Liquidity Provider Fee</span>
              <svg className="w-4 h-4 text-gray-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </Tooltip>
          <span>{lpFee} {toToken}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <Tooltip text="The path your swap takes through different liquidity pools to get the best rate.">
            <div className="flex items-center">
              <span>Route</span>
              <svg className="w-4 h-4 text-gray-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </Tooltip>
          <div className="flex items-center">
            <img 
              src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/16/color/${fromToken.toLowerCase()}.png`}
              alt={fromToken} 
              className="w-4 h-4" 
            />
            <svg className="mx-1 w-3 h-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <img 
              src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/16/color/${toToken.toLowerCase()}.png`}
              alt={toToken} 
              className="w-4 h-4" 
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Tooltip text="The estimated cost of executing this swap on the blockchain.">
            <div className="flex items-center">
              <span>Gas Estimate</span>
              <svg className="w-4 h-4 text-gray-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </Tooltip>
          <span>{gasEstimate}</span>
        </div>
      </div>
      
      <button 
        onClick={handleSwap}
        disabled={isSwapping}
        className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSwapping ? "Processing..." : "Swap Now"}
      </button>
    </div>
  );
}
