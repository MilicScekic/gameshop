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
import { autoSigninUser, logoutAfterSession } from "./store/actions/auth";
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

function App({ autoSigninUser, logoutAfterSession }) {
  //? Moze posluziti...
  // const [isLogged, setIsLogged] = useState(!!localStorage.getItem('access'));

  //* Ukoliko ima token(access) u local storage, prijavi tog korisnika
  //! Za sad komentar dok se ne napravi ruta koja vraca prijavljenog korisnika
  //? access je token
  useEffect(() => {
    localStorage.access
      ? autoSigninUser(localStorage.access) && logoutAfterSession(60) // U minutima
      : delete localStorage.access;
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

export default connect(null, { autoSigninUser, logoutAfterSession })(App);
