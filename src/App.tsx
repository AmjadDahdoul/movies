import { BrowserRouter } from "react-router";
import "./App.css";
import { ThemeProvider } from "./lib/theme/ThemeContextProvider";
import { Layout } from "./lib/components/layout/Layout";
import { HomePage } from "./lib/pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout title='Tranquility'>
          <HomePage />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
