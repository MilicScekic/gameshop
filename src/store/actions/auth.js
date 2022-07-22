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

export const registerUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post("/api/auth/register", formData);
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
    dispatch(autoSigninUser());
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post(
      "http://localhost:1337/api/auth/local",
      formData
    );
    dispatch({ type: AUTH_SUCCESS, payload: res.data.jwt });
    dispatch(autoSigninUser());
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const autoSigninUser = () => async (dispatch) => {
  if (localStorage.token) setAxiosToken(localStorage.token);

  try {
    // const res = await axios.get("http://localhost:1337/api/auth/local");

    //* PRIMJER za testiranje
    //? Ovdje treba da dodje API (GET) koji kupi podatke prijavljenog korisnika
    const res = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: "ana@ana.com",
      password: "Sinisa!1",
    });

    dispatch({ type: AUTO_SIGNIN_SUCCESS, payload: res.data.user });
    dispatch(getUserProfile()); //? Pokupi podatke
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
