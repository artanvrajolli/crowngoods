import { createTheme, ThemeProvider } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Header from "./layout/Header.tsx";
import { CartProvider } from "./context/CartContext.tsx";

const customTheme = createTheme({
  button: {
    color: {
      primary: "!bg-[#e15726] !text-white hover:!bg-[#e15726]/90",
      secondary: "!bg-white !text-[#e15726] hover:!bg-gray-100",
      gray: "!bg-gray-100 !text-gray-900 hover:!bg-gray-200",
    },
  },
  textInput: {
    "base": "flex",
    "addon": "inline-flex  items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    "field": {
      "base": "relative  w-full",
      "input": {
        "base": "block  !bg-white !text-black w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
      }
    }
  },
  toggleSwitch: {
    toggle: {
      base: "rounded-lg !ring !ring-white after:rounded-md",

      checked: {
        on: "!bg-[#e15726]",
        off: "!bg-white outline outline-gray-300",
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <ThemeProvider theme={customTheme}>
        <Header />
        <App />
      </ThemeProvider>
    </CartProvider>
  </StrictMode>,
);

