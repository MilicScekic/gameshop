import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      component={(props) =>
        authTokens ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

// import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// export const PrivateRoute = ({ children }) => {
//   const { authTokens } = useContext(AuthContext);

//   return authTokens ? children : <Redirect to="/login" />;
// };
