import { useWallet } from "@/lib/useWallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Portfolio() {
  const { tokens, isConnected } = useWallet();
  
  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto text-center glass-card p-8">
        <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400 mb-4">
          Please connect your wallet to view your portfolio.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(tokens).map(([symbol, token]) => (
          <Card key={symbol} className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <img 
                  src={token.icon} 
                  alt={token.symbol} 
                  className="w-6 h-6 mr-2" 
                />
                {token.name} ({token.symbol})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{token.balance.toFixed(6)}</div>
              <div className="text-muted-foreground text-sm mt-1">
                {token.symbol === "ETH" 
                  ? `≈ $${(token.balance * 1805.42).toFixed(2)} USD` 
                  : token.symbol === "USDC" || token.symbol === "DAI"
                    ? `≈ $${token.balance.toFixed(2)} USD`
                    : `≈ $${(token.balance * 28750).toFixed(2)} USD` // WBTC price approximation
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
