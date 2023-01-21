import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { BluThemeProvider } from "../components/ThemeProvider";
import "highlight.js/styles/github-dark-dimmed.css";
import { useEffect, useRef } from "react";
import { BluFetch } from "../src/helpers/BluFetch";

function MyApp({ Component, pageProps }: AppProps) {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../authWorker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
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
