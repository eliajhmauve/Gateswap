import { useEffect } from "react";
import { useLocation } from "wouter";
import { useVerification } from "@/lib/useVerification";

export default function Home() {
  const [, navigate] = useLocation();
  const { isVerified } = useVerification();

  useEffect(() => {
    // Redirect based on verification status
    if (isVerified) {
      navigate("/swap");
    } else {
      navigate("/verify");
    }
  }, [isVerified, navigate]);

  // This is just a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-glow top-0 left-0"></div>
      <div className="bg-glow bottom-0 right-0"></div>
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">GateSwap</h1>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}
