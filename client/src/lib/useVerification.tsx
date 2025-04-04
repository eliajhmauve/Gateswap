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
      // 先设置本地存储，确保其他组件可以读取到状态
      localStorage.setItem("isVerified", "true");
      
      if (walletAddress) {
        console.log("Verifying wallet address:", walletAddress);
        await apiRequest("/api/verify", "POST", { walletAddress });
        localStorage.setItem("walletAddress", walletAddress);
      }
      
      // 更新状态
      setIsVerified(true);
      setShowingQR(false);
      
      // 使用 Promise 和 setTimeout 确保状态更新完成
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
      
      return true; // 返回成功状态
    } catch (error) {
      console.error("验证过程出错:", error);
      // 清除所有状态
      setIsVerified(false);
      setShowingQR(false);
      localStorage.removeItem("isVerified");
      localStorage.removeItem("walletAddress");
      return false;
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