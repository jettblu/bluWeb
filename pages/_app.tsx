import { load, trackPageview } from "fathom-client";
import "highlight.js/styles/github-dark-dimmed.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useRef } from "react";

import { BluDataProvider } from "../components/DataProvider";
import Layout from "../components/Layout";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

// Record a pageview when route changes
Router.events.on("routeChangeComplete", (as, routeProps) => {
  if (!routeProps.shallow) {
    trackPageview();
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  const workerRef = useRef<Worker>();
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../authWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
    // load fathom
    load("KMWGVIMQ", {
      includedDomains: ["www.jetthays.com", "jetthays.com"],
    });
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      enableColorScheme={true}
      themes={["light", "dark"]}
    >
      <BluDataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BluDataProvider>
    </ThemeProvider>
  );
}

export default MyApp;
