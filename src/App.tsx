import { BrowserRouter } from "react-router";
import "./App.css";
import { ThemeProvider } from "./lib/theme/ThemeContextProvider";
import { Layout } from "./lib/components/layout/Layout";
import { HomePage } from "./lib/pages/HomePage";
import SplashCursor from "./lib/components/SplashCursor";
import { useState, useEffect } from "react";

function App() {
  const [showSplashCursor, setShowSplashCursor] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newTypedKeys = (typedKeys + event.key).toLowerCase();
      setTypedKeys(newTypedKeys);

      if (newTypedKeys.includes("fabulous")) {
        setShowSplashCursor(!showSplashCursor);
        setTypedKeys("");
      } else if (newTypedKeys.length > 10) {
        setTypedKeys(newTypedKeys.slice(-10));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showSplashCursor, typedKeys]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout title='Tranquility Cinema'>
          {showSplashCursor && <SplashCursor />}
          <HomePage />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
