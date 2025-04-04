import { useEffect, useState } from "react";
import { useVerification } from "@/lib/useVerification";
import { useWallet } from "@/lib/useWallet";

export default function QRCodeCard() {
  const { cancelVerification, completeVerification } = useVerification();
  const { address } = useWallet();
  const [timer, setTimer] = useState(60);
  
  // Simulate QR code expiry timer
  useEffect(() => {
    if (timer <= 0) {
      cancelVerification();
      return;
    }
    
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer, cancelVerification]);
  
  // For demo purposes, auto-complete verification after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (address) {
        completeVerification(address);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [completeVerification, address]);
  
  // Create a data URL for QR code (using pre-generated QR for demo)
  const qrDataUrl = "data:image/png;base64,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";
  
  return (
    <div className="glass-card p-8 md:p-10 w-full max-w-md animate-border-glow">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Scan with Self Protocol App</h2>
        <p className="text-gray-300 mt-2 mb-5">Scan this QR code with your Self Protocol mobile app to verify your identity</p>
        
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg inline-block">
            <img src={qrDataUrl} alt="QR Code" className="w-48 h-48" />
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-300">QR Code expires in <span className="font-semibold">{timer}</span> seconds</p>
        </div>
      </div>
      
      <button 
        onClick={cancelVerification}
        className="w-full border border-gray-600 hover:border-gray-500 bg-transparent text-white font-medium rounded-lg py-2 px-4 transition-colors mt-4"
      >
        Cancel
      </button>
    </div>
  );
}