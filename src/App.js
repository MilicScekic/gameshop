import React, { useContext } from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import PrivateRoute from "./hoc/PrivateRoute";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import { LastLocationProvider } from "react-router-last-location";
import { connect } from "react-redux";
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
          <Router>
            <LastLocationProvider>
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/shop" component={Shop} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/about" component={About} />
                  <Route path="/contact" component={Contact} />

                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />

                  {/* <PrivateRoute exact path="/admin" component={Dashboard} /> */}

                  <Route exact path="/products" component={Products} />
                  <Route exact path="/product/:name" component={Product} />
                </Switch>
              </Layout>
            </LastLocationProvider>
          </Router>
        </AuthContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
}

// export default App;
export default connect(null)(App);
