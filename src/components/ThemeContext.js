import { createContext } from "react";
const ThemeContext = createContext({
  currentTheme: "",
  toggleTheme: () => {},
});

export default ThemeContext;
