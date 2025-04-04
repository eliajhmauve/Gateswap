import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check if it's a mobile device using user agent or screen width
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      
      // Also check for small screen sizes
      const smallScreen = window.innerWidth < 768;
      
      setIsMobile(mobile || smallScreen);
    };

    checkIsMobile();
    
    // Add resize listener to adjust for orientation changes and window resizing
    window.addEventListener("resize", checkIsMobile);
    
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}