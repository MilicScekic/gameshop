import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNIN_SUCCESS,
  AUTO_SIGNIN_FAIL,
  LOGOUT,
  CLEAN_USER,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      // localStorage.setItem("token", payload.token);
      localStorage.setItem("token", payload); // u auth za dispatch({ type: AUTH_SUCCESS, payload: res.data.jwt });
      return state;
    case AUTO_SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case AUTH_FAIL:
    case AUTO_SIGNIN_FAIL:
    case CLEAN_USER:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
