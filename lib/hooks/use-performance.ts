import { useEffect, useState } from "react";
import { 
  isSlowDevice, 
  getAnimationSettings,
  checkMemoryUsage 
} from "@/lib/utils/performance-guard";

/**
 * Hook to detect device performance
 */
export function usePerformance() {
  const [isSlow, setIsSlow] = useState(false);
  const [settings, setSettings] = useState(getAnimationSettings());
  const [memoryWarning, setMemoryWarning] = useState(false);

  useEffect(() => {
    // Check device performance
    const slow = isSlowDevice();
    setIsSlow(slow);
    setSettings(getAnimationSettings());

    // Monitor memory usage
    const memoryInterval = setInterval(() => {
      const { isHigh } = checkMemoryUsage();
      setMemoryWarning(isHigh);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(memoryInterval);
  }, []);

  return {
    isSlowDevice: isSlow,
    settings,
    memoryWarning,
  };
}

/**
 * Hook to detect connection speed
 */
export function useConnectionSpeed() {
  const [connectionSpeed, setConnectionSpeed] = useState<string>("unknown");
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const connection = (navigator as any).connection;

    if (!connection) {
      return;
    }

    const updateConnection = () => {
      const effectiveType = connection.effectiveType || "unknown";
      setConnectionSpeed(effectiveType);
      setIsSlow(effectiveType === "slow-2g" || effectiveType === "2g");
    };

    updateConnection();
    connection.addEventListener("change", updateConnection);

    return () => {
      connection.removeEventListener("change", updateConnection);
    };
  }, []);

  return {
    connectionSpeed,
    isSlowConnection: isSlow,
  };
}



