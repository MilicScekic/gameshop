import React, { useEffect } from "react";
import Layout from "./layouts/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { teal, grey, red } from "@mui/material/colors";
import PrivateRoute from "./hoc/PrivateRoute";
import ProtectedRoute from "./hoc/ProtectedRoute";
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
import { ProductsDev as DashboardProductsDev } from "./pages/Dashboard/ProductsDev";
import { Categories } from "./pages/Dashboard/Categories";
import Sidebar from "./layouts/Sidebar";
import { Orders } from "./pages/Dashboard/Orders";
import Checkout from "./pages/Checkout";
import {
  getCategories,
  clearCategories,
  clearAllProducts,
  getAllProducts,
} from "./store/actions/products";

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
  clearAllProducts,
  getAllProducts,
}) {
  //* Ovo je ako se osvjezi stranica, da odma prijavi korisnika, da ne ceka 5 minuta da to uradi useEffect dolje pri pri rifresu tokena
  useEffect(() => {
    !!localStorage.access && autoSigninUser(localStorage.access);

    // logoutAfterSession(60); // u minutima. Trajanje sesije
  }, []);

  //* access je token za pristup koji traje 5 min. Refresh je token koji traje 24h
  useEffect(() => {
    setInterval(() => {
      !!localStorage.refresh
        ? refreshAccessToken(localStorage.refresh)
        : delete localStorage.refresh &&
          delete localStorage.access && <Redirect to="/login" />;
    }, 5 * 60 * 1000);
  }, []);

  useEffect(() => {
    clearAllProducts();

    const timeout = setTimeout(() => {
      getAllProducts();
    }, 200);

    return () => {
      clearAllProducts();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    clearCategories();

    const timeoutId = setTimeout(() => {
      getCategories(); // popunjava niz categories u reducer
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      clearCategories();
    };
  }, [clearCategories, getCategories]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <LastLocationProvider>
          <Switch>
            <ProtectedRoute path="/admin/">
              <Sidebar>
                <ProtectedRoute path="/admin/dashboard" component={Dashboard} />
                <ProtectedRoute
                  path="/admin/products"
                  component={DashboardProducts}
                />
                <ProtectedRoute
                  path="/admin/products-dev"
                  component={DashboardProductsDev}
                />
                <ProtectedRoute
                  path="/admin/Categories"
                  component={Categories}
                />
                <ProtectedRoute path="/admin/orders" component={Orders} />
              </Sidebar>
            </ProtectedRoute>

            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/about" component={About} />
              <Route path="/contact" component={Contact} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

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
  clearAllProducts,
  getAllProducts,
})(App);
