import { BrowserRouter } from "react-router";
import "./App.css";
import { MoviesList } from "./lib/components/movie-list/MoviesList";
import { ThemeProvider } from "./lib/theme/ThemeContextProvider";
import { Navbar } from "./lib/components/navbar/Navbar";
import { Container } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Container disableGutters>
          <Navbar title='Tranquility Base' />
          <MoviesList />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
