import React, { useContext } from "react";
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
import Product from "./pages/Product";
import { PrivateRoute } from "./hoc/PrivateRoute";
import Cart from "./pages/Cart";
import { CartContextProvider } from "./contexts/CartContext";

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
      <CartContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route
                path="/admin"
                element={<PrivateRoute children={<Dashboard />} />}
              /> */}

                <Route path="/product/:name" element={<Product />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
