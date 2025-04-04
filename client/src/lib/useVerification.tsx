import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "./queryClient";

interface VerificationContextType {
  isVerified: boolean;
  startVerification: () => void;
  completeVerification: (walletAddress?: string) => void;
  cancelVerification: () => void;
  showingQR: boolean;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [showingQR, setShowingQR] = useState(false);
  const [, navigate] = useLocation();
  
  // Check local storage for verification status on load
  useEffect(() => {
    const verified = localStorage.getItem("isVerified") === "true";
    setIsVerified(verified);
  }, []);
  
  const startVerification = () => {
    setShowingQR(true);
  };
  
  const completeVerification = async (walletAddress?: string) => {
    try {
      if (walletAddress) {
        // Call API to record verification
        await apiRequest("/api/verify", "POST", { walletAddress });
        localStorage.setItem("walletAddress", walletAddress);
      }
      
      // Update state and local storage
      setIsVerified(true);
      setShowingQR(false);
      localStorage.setItem("isVerified", "true");
      
      // Navigate to swap page
      navigate("/swap");
    } catch (error) {
      console.error("Error during verification:", error);
      // If API call fails, we'll still set local verification for demo
      setIsVerified(true);
      setShowingQR(false);
      localStorage.setItem("isVerified", "true");
      navigate("/swap");
    }
  };
  
  const cancelVerification = () => {
    setShowingQR(false);
  };
  
  return (
    <VerificationContext.Provider value={{ 
      isVerified, 
      startVerification, 
      completeVerification,
      cancelVerification,
      showingQR
    }}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider");
  }
  return context;
}