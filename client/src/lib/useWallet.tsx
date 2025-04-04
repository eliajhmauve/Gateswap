import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useVerification } from "./useVerification";

// Mock data for token balances
const TOKENS = {
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    balance: 1.245,
    icon: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/eth.png"
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    balance: 0,
    icon: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/usdc.png"
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: 150.75,
    icon: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/dai.png"
  },
  WBTC: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: 0.015,
    icon: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/wbtc.png"
  }
};

type TokenSymbol = keyof typeof TOKENS;

interface Token {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  tokens: Record<string, Token>;
  getBalance: (symbol: TokenSymbol) => number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const { isVerified } = useVerification();

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress && isVerified) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
  }, [isVerified]);

  const connectWallet = () => {
    // In a real implementation, you would use RainbowKit here
    // For now, we'll simulate a successful connection
    const mockAddress = "0x7f...3e4a";
    setAddress(mockAddress);
    setIsConnected(true);
    localStorage.setItem("walletAddress", mockAddress);
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("walletAddress");
  };

  const getBalance = (symbol: TokenSymbol): number => {
    return TOKENS[symbol]?.balance || 0;
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      address, 
      connectWallet, 
      disconnectWallet,
      tokens: TOKENS,
      getBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
