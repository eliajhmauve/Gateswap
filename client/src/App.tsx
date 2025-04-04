import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Verify from "@/pages/Verify";
import Swap from "@/pages/Swap";
import Portfolio from "@/pages/Portfolio";
import Success from "@/pages/Success";
import AppLayout from "@/components/layout/AppLayout";
import { VerificationProvider } from "@/lib/useVerification";
import { WalletProvider } from "@/lib/useWallet";
import { TaskProgressProvider } from "@/lib/useTaskProgress";

function Router() {
  const [location] = useLocation();
  const isVerified = localStorage.getItem("isVerified") === "true";

  // Redirect to verification page if not verified and trying to access protected routes
  if (!isVerified && (location === "/swap" || location === "/portfolio" || location === "/success")) {
    window.location.href = "/verify";
    return null;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verify" component={Verify} />
      <Route path="/success" component={Success} />
      <Route path="/swap">
        {() => (
          <AppLayout>
            <Swap />
          </AppLayout>
        )}
      </Route>
      <Route path="/portfolio">
        {() => (
          <AppLayout>
            <Portfolio />
          </AppLayout>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VerificationProvider>
        <WalletProvider>
          <TaskProgressProvider>
            <Router />
            <Toaster />
          </TaskProgressProvider>
        </WalletProvider>
      </VerificationProvider>
    </QueryClientProvider>
  );
}

export default App;
