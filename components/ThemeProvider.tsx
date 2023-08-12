"use client";

import { ThemeProvider } from "next-themes";

export default function BluThemeProvider(props: any) {
  const { children } = props;
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      enableColorScheme={true}
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}
