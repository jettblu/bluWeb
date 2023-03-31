import { load, trackPageview } from "fathom-client";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function FathomView() {
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

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <FathomView />
    </Suspense>
  );
}
