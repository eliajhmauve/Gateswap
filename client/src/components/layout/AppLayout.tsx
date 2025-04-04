import React from "react";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";
import { useVerification } from "@/lib/useVerification";
import { useLocation } from "wouter";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isVerified } = useVerification();
  const [location] = useLocation();

  // Redirect to verification page if not verified
  React.useEffect(() => {
    if (!isVerified) {
      window.location.href = "/verify";
    }
  }, [isVerified]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background glows */}
      <div className="bg-glow top-0 left-0"></div>
      <div className="bg-glow bottom-0 right-0"></div>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mb-16 md:mb-0">
        {children}
      </main>
      
      <MobileNavigation currentPath={location} />
    </div>
  );
}
