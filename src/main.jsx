import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
console.log(
  "VITE_MAMA_MIA using import.meta.env ",
  import.meta.env.VITE_MAMA_MIA,
);
console.log("VITE_MAMA_MIA using JSON.stringify(env.VITE_MAMA_MIA) ", BEKO);
console.log("VITE_MAMA_MIA JSON.stringify(process.env.VITE_MAMA_MIA), ", SEKO);
// console.log("using process.env.VITE_VERCEL_ENV,", __APP_ENV__);
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
