import "highlight.js/styles/github-dark-dimmed.css";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { BluThemeProvider } from "../components/ThemeProvider";
import * as Fathom from "fathom-client";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const workerRef = useRef<Worker>();
  const router = useRouter();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../authWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
    // Initialize Fathom when the app loads
    Fathom.load("EDTJYLRZ", {
      includedDomains: ["www.jetthays.com"],
    });
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <BluThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BluThemeProvider>
  );
}

export default MyApp;
