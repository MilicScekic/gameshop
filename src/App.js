import React, { useContext, useEffect } from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { teal, grey, red } from "@mui/material/colors";
import PrivateRoute from "./hoc/PrivateRoute";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { LastLocationProvider } from "react-router-last-location";
import { connect } from "react-redux";
import Favorites from "./pages/Favorites";
import {
  autoSigninUser,
  logoutAfterSession,
  refreshAccessToken,
} from "./store/actions/auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Products as DashboardProducts } from "./pages/Dashboard/Products";
import Sidebar from "./layouts/Sidebar";
import Orders from "./pages/Dashboard/Orders";
import Checkout from "./pages/Checkout";
import { getCategories, clearCategories } from "./store/actions/products";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: teal[600],
    },
    secondaryDark: {
      main: teal[900],
    },
    red: {
      main: red[700],
    },
  },
});

function App({
  autoSigninUser,
  logoutAfterSession,
  refreshAccessToken,
  getCategories,
  clearCategories,
}) {
  //* Ovo je ako se osvjezi stranica, da odma prijavi korisnika, da ne ceka 5 minuta da to uradi useEffect dolje pri pri rifresu tokena
  useEffect(() => {
    localStorage.access && autoSigninUser(localStorage.access);
    //? Po ure
    logoutAfterSession(30); // u minutima. Trajanje sesije
  }, []);

  //! Ako bi se na server postavio trajanje za osvjezavanje tokena na 5ms, onda bi morali i interval pomjeriti spram tog kasnjenja
  //* access je token za pristup koji traje 5 min. Refresh je token koji traje 24h
  useEffect(() => {
    setInterval(() => {
      !!localStorage.refresh
        ? refreshAccessToken(localStorage.refresh)
        : delete localStorage.refresh && delete localStorage.access;
    }, 5 * 60 * 1000);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCategories(); // popunjava niz categories u reducer
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearCategories(); // Nece se niz praznit uopste, jer je u App.js
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LastLocationProvider>
          <Switch>
            <Route path="/admin/">
              <Sidebar>
                <PrivateRoute path="/admin/dashboard" component={Dashboard} />
                <PrivateRoute
                  path="/admin/products"
                  component={DashboardProducts}
                />
                <PrivateRoute path="/admin/orders" component={Orders} />
              </Sidebar>
            </Route>

            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/about" component={About} />
              <Route path="/contact" component={Contact} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {/* <PrivateRoute exact path="/admin" component={Dashboard} /> */}
              <PrivateRoute exact path="/wishlist" component={Favorites} />

              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={Product} />
              <PrivateRoute exact path="/checkout" component={Checkout} />
            </Layout>
          </Switch>
        </LastLocationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default connect(null, {
  autoSigninUser,
  logoutAfterSession,
  refreshAccessToken,
  getCategories,
  clearCategories,
})(App);
