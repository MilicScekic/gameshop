import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNIN_SUCCESS,
  AUTO_SIGNIN_FAIL,
  LOGOUT,
  CLEAN_USER,
} from "./types";
import axios from "axios";
import { setAxiosToken } from "../../utils/setAxiosToken";
import { getUserProfile } from "./user";
import { setAlert, showSpinner, hideSpinner } from "./visual";
import { cors } from "../reducers/auth";

export const registerUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post(
      `${cors}https://gameshop-g5.com/auth/register/`,
      {
        headers: {
          Accept: "application/json",
        },
      },
      formData
    );
    console.log(res.data);
    // dispatch({ type: AUTH_SUCCESS, payload: res.data });
    // dispatch(autoSigninUser());
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Registration failed", "error"));
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post(
      `${cors}https://gameshop-g5.com/auth/login/`,
      {
        headers: {
          Accept: "application/json",
        },
      },
      formData
    );

    console.log(res.data);

    //? moze i ovako
    // let { jwt } = res.data;
    // dispatch({ type: AUTH_SUCCESS, payload: res.data.access });

    //dispatch(autoSigninUser(res.data.access)); //! Ovaj tip funkcije ne bi trebao da ima parametar
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const autoSigninUser = (token) => async (dispatch) => {
  if (localStorage.token) setAxiosToken(localStorage.token);

  try {
    //* PRIMJER za testiranje (Storage API sam uzeo kao test)
    const res = await axios.get(
      `https://api.escuelajs.co/api/v1/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(res.data);
    dispatch({ type: AUTO_SIGNIN_SUCCESS, payload: res.data });
    dispatch(getUserProfile(token)); //? Pokupi podatke prema tokenu
    dispatch(setAlert("Logged in successfully", "success"));
  } catch (err) {
    dispatch({ type: AUTO_SIGNIN_FAIL });
    dispatch(setAlert("Automatic login failed, please log in", "warning"));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAN_USER });
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Logged out successfully", "success"));
};

//* Opciono
//? Optional feature
export const logoutAfterSession = (timer) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer * 60000);
};

export const deleteAccount = (history) => async (dispatch) => {
  try {
    await axios.delete("/api/auth");
    history.push("/");
    dispatch(setAlert("Account deleted", "success"));
    dispatch({ type: CLEAN_USER });
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};
