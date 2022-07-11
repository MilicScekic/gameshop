import Layout from "./layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink, purple } from "@mui/material/colors";
import { AuthContextProvider } from "./contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: pink[600],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
