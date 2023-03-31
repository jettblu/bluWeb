import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Fathom() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    // Initialize Fathom when the app loads
    load("KMWGVIMQ", {
      includedDomains: ["www.jetthays.com", "jetthays.com"],
      spa: "auto",
    });
  }, [pathname, searchParams]);

  return null;
}
