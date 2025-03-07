import { BrowserRouter } from "react-router";
import "./App.css";
import { MoviesList } from "./lib/components/movie-list/MoviesList";
import { ThemeProvider } from "./lib/theme/ThemeContextProvider";
import { Layout } from "./lib/components/layout/Layout";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout title='Tranquility'>
          <MoviesList />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
