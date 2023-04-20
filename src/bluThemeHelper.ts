import { useEffect, useState } from "react";

export function useBluTheme() {
  // init state
  const [isDark, setIsDark] = useState(false);
  const [themeLoading, setThemeLoading] = useState(true);

  const defaultTheme: ITheme = {
    isDark: true,
    lastUpdated: Date.now(),
  };
  interface ITheme {
    isDark: boolean;
    lastUpdated: number;
  }

  const generateThemeLocation = function () {
    let themeLocation = `blu|theme`;
    return themeLocation;
  };

  const fetchTheme = function () {
    let theme: ITheme;
    let themeString: string | null = null;
    const themeLocation = generateThemeLocation();
    themeString = localStorage.getItem(themeLocation);
    // fetch stored theme
    if (!themeString) {
      theme = defaultTheme;
    } else {
      theme = { ...JSON.parse(themeString) };
    }
    // update state
    setIsDark(theme.isDark);
  };

  function updateIsDark(newIsDark: boolean) {
    console.log("Updating is dark...");
    let newTheme: ITheme = {
      isDark: newIsDark,
      lastUpdated: Date.now(),
    };
    // update app state
    setIsDark(newIsDark);
    // update stored theme
    updateTheme(newTheme);
  }

  // updates local storage theme value
  const updateTheme = function (newTheme: ITheme) {
    let themeLocation = generateThemeLocation();
    let themeString = JSON.stringify(newTheme);
    localStorage.setItem(themeLocation, themeString);
  };

  useEffect(() => {
    setThemeLoading(true);
    // fetch current theme
    // fetchTheme();
    if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("Dark mode detected");
      setIsDark(true);
    } else {
      console.log("Light mode detected");
      setIsDark(false);
    }
    console.log("Theme loaded.");
    setThemeLoading(false);
  }, []);

  return {
    isDark,
    updateIsDark,
    themeLoading,
  };
}
