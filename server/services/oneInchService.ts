// Function to get swap quotes from 1inch API
export async function getSwapQuote(
  fromToken: string,
  toToken: string,
  amount: string
) {
  try {
    // Get API key from environment variable
    const apiKey = process.env.ONEINCH_API_KEY || "";
    
    if (!apiKey) {
      console.warn("Warning: ONEINCH_API_KEY environment variable not set");
    }

    // Map token symbols to their contract addresses
    // In a real implementation, these would be fetched from a token list or database
    const tokenAddresses: Record<string, string> = {
      'ETH': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      'WBTC': '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    };

    // Get token addresses from symbols
    const fromTokenAddress = tokenAddresses[fromToken] || fromToken;
    const toTokenAddress = tokenAddresses[toToken] || toToken;
    
    // Convert amount to wei if ETH (1 ETH = 10^18 wei)
    const amountWei = fromToken === 'ETH' 
      ? (parseFloat(amount) * 1e18).toString()
      : amount;

    // Call 1inch API
    const response = await fetch(
      `https://api.1inch.io/v5.0/1/quote?` +
      `fromTokenAddress=${fromTokenAddress}&` +
      `toTokenAddress=${toTokenAddress}&` +
      `amount=${amountWei}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`1inch API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    // Process and return the quote data
    return {
      estimatedGas: data.estimatedGas,
      toTokenAmount: data.toTokenAmount,
      fromTokenAmount: data.fromTokenAmount,
      route: data.protocols || [],
      price: data.price,
    };
  } catch (error) {
    console.error("Error fetching quote from 1inch:", error);
    throw error;
  }
}
