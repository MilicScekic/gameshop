import React, { useContext, useEffect } from "react";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink, purple } from "@mui/material/colors";
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
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Sidebar from "./layouts/Sidebar";
import Orders from "./pages/Orders";

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

function App({ autoSigninUser, logoutAfterSession, refreshAccessToken }) {
  //* Ovo je ako se osvjezi stranica, da odma prijavi korisnika, da ne ceka 5 minuta da to uradi useEffect dolje pri pri rifresu tokena
  useEffect(() => {
    !!localStorage.access
      ? autoSigninUser(localStorage.access)
      : delete localStorage.access;

    //? Po ure
    logoutAfterSession(30); // u minutima.
  }, []);

  //! Ako bi se na server postavio trajanje za osvjezavanje tokena na 5ms, onda bi morali i interval pomjeriti spram tog kasnjenja
  //* access je token za pristup koji traje 5 min. Refresh je token koji traje 24h
  useEffect(() => {
    setInterval(() => {
      !!localStorage.access
        ? autoSigninUser(localStorage.access)
        : delete localStorage.access;

      !!localStorage.refresh
        ? refreshAccessToken(localStorage.refresh)
        : delete localStorage.refresh;
    }, 300000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LastLocationProvider>
          <Switch>
            <Route path="/admin/">
              <Sidebar>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/games" component={Games} />
                <Route path="/admin/orders" component={Orders} />
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
              <PrivateRoute exact path="/favorites" component={Favorites} />
              {/* <Route exact path="/favorites" component={Favorites} /> */}

              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={Product} />
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
})(App);
