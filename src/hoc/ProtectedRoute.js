import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  user,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && user.id === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
