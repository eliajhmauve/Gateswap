import { useEffect } from "react";
import { useLocation } from "wouter";
import { DevButtons } from "@/components/dev/DevButtons";
import { useVerification } from "@/lib/useVerification";
import VerificationCard from "@/components/verification/VerificationCard";
import QRCodeCard from "@/components/verification/QRCodeCard";

export default function Verify() {
  const [, navigate] = useLocation();
  const { isVerified, showingQR } = useVerification();

  // Redirect if already verified
  useEffect(() => {
    if (isVerified) {
      navigate("/swap");
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="bg-glow top-0 left-0"></div>
      <div className="bg-glow bottom-0 right-0"></div>

      {showingQR ? <QRCodeCard /> : <VerificationCard />}
      <DevButtons />
    </div>
  );
}
