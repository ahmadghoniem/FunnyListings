import { useLayoutEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  useLayoutEffect(() => {
    // inital load
    let localStorageTheme = localStorage.theme;
    const documentClassList = document.documentElement.classList;
    const OSDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorageTheme === "dark" || localStorageTheme === "light") {
      if (localStorageTheme === "dark") documentClassList.add("dark");
      setCurrentTheme(localStorageTheme);
    } else {
      // if localStorage theme value is not set
      // use color Scheme Preference
      if (OSDarkMode) documentClassList.add("dark");
      setCurrentTheme(OSDarkMode ? "dark" : "light");
    }
    // whenever a change occurs with the user's color theme if there's no localStorageTheme set or is equal to system

    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      ({ matches: OSDarkMode }) => {
        if (localStorage.theme === "dark" || localStorage.theme === "light")
          return;
        if (OSDarkMode) documentClassList.add("dark");
        else documentClassList.remove("dark");

        setCurrentTheme(OSDarkMode ? "dark" : "light");
      },
    );
  }, []);

  const setTheme = (theme) => {
    const documentClassList = document.documentElement.classList;

    switch (theme) {
      case "light": {
        if (documentClassList.contains("dark"))
          documentClassList.remove("dark");
        console.log("called light switch");
        localStorage.theme = "light";
        setCurrentTheme("light");
        break;
      }
      case "dark":
        {
          if (!documentClassList.contains("dark"))
            documentClassList.add("dark");
          console.log("called dark switch");

          localStorage.theme = "dark";
          setCurrentTheme("dark");
        }
        break;
    }
  };

  const values = {
    currentTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
