import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNIN_SUCCESS,
  AUTO_SIGNIN_FAIL,
  LOGOUT,
  CLEAN_USER,
  NEW_ACCESS_TOKEN,
} from "../actions/types";

export const cors = "https://cors-anywhere.herokuapp.com/";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      localStorage.setItem("refresh", payload.refresh);
      localStorage.setItem("access", payload.access);
      return state;
    case NEW_ACCESS_TOKEN:
      localStorage.setItem("access", payload.access);
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
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
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
