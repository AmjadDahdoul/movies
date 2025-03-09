import { BrowserRouter } from "react-router";
import "./App.css";
import { ThemeProvider } from "./lib/theme/ThemeContextProvider";
import { Layout } from "./lib/components/layout/Layout";
import { MoviesListLayout } from "./lib/components/movie-list/MoviesListLayout";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout title='Tranquility'>
          <MoviesListLayout />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
