import { useVerification } from "@/lib/useVerification";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { useWallet } from "@/lib/useWallet";
import { apiRequest } from "@/lib/queryClient";

export default function VerificationCard() {
  const { startVerification, completeVerification } = useVerification();
  const isMobile = useIsMobile();
  const { address } = useWallet();
  const [isVerifying, setIsVerifying] = useState(false);

  // Function to handle mobile verification via deep link
  const handleMobileVerification = () => {
    setIsVerifying(true);
    
    // Generate a random task ID for demo purposes
    const taskId = Math.random().toString(36).substring(2, 10);
    
    // In a real implementation, this would register the verification session with Self Protocol
    // and then open their app via deep link
    
    // Simulate API call
    const mockVerify = async () => {
      try {
        if (address) {
          // Call our mock API
          await apiRequest<{ verified: boolean }>("/api/verify", "POST", { walletAddress: address });
          completeVerification(address);
        }
      } catch (error) {
        console.error("Verification failed", error);
        setIsVerifying(false);
      }
    };
    
    // For demo, we'll just simulate opening the app and then verify after a delay
    window.open(`self://verify?taskId=${taskId}`, "_blank");
    
    // Simulate completion after a delay
    setTimeout(() => {
      mockVerify();
    }, 3000);
  };

  return (
    <div className="glass-card p-8 md:p-10 w-full max-w-md animate-border-glow">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">GateSwap</h1>
        <p className="text-gray-300 text-sm md:text-base">Verified DeFi Swapping</p>
      </div>
      
      <div className="text-center mb-8">
        <svg className="w-24 h-24 mx-auto mb-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl md:text-2xl font-semibold mb-3">Identity Verification Required</h2>
        <p className="text-gray-300 text-sm md:text-base">
          To protect against sybil attacks, we require identity verification before using the swap features.
        </p>
      </div>
      
      {isMobile ? (
        // Mobile experience - deep link to Self app
        <button 
          onClick={handleMobileVerification}
          disabled={isVerifying}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Open Self App"}
        </button>
      ) : (
        // Desktop experience - show QR code
        <button 
          onClick={startVerification}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Scan QR with Self App
        </button>
      )}
      
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>{isMobile ? "You'll be redirected to the Self App for verification" : "Scan the QR code with your Self App to verify your identity"}</p>
      </div>
    </div>
  );
}
