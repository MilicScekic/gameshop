import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTO_SIGNIN_SUCCESS,
  AUTO_SIGNIN_FAIL,
  LOGOUT,
  CLEAN_USER,
  NEW_ACCESS_TOKEN,
} from "./types";
import axios from "axios";
import {
  openOrder,
  getOrderItems,
  getUserProfile,
  getWishlistItems,
} from "./user";
import { setAlert, showSpinner, hideSpinner } from "./visual";

export const registerUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post(
      "https://gameshop-g5.com/auth/register/",
      formData
    );
    console.log(res.data);
    dispatch(setAlert("Registration success. Now you can login!", "success"));
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    // dispatch(setAlert(response.data.detail, "error"));
    dispatch(setAlert("Registration failed", "error"));
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.post(
      "https://gameshop-g5.com/auth/login/",
      formData
    );

    dispatch({ type: AUTH_SUCCESS, payload: res.data });
    dispatch(autoSigninUser(res.data.access));
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch({ type: AUTH_FAIL });
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://gameshop-g5.com/auth/login/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    console.log("New refreshed token:");
    console.log(res.data.access);
    dispatch({ type: NEW_ACCESS_TOKEN, payload: res.data }); //u reducer(auth): payload.access pa ne mora res.data.access
    dispatch(autoSigninUser(res.data.access));
  } catch (err) {
    dispatch(setAlert("Error", "error"));
  }
};

export const autoSigninUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`https://gameshop-g5.com/auth/current_user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //? Testiranje
    console.log("Current user");
    console.log(res.data);

    dispatch({ type: AUTO_SIGNIN_SUCCESS, payload: res.data });
    dispatch(getUserProfile(token)); //? Pokupi podatke prema tokenu i popuni user objekat
    dispatch(openOrder()); //? Otvori order.
    dispatch(getOrderItems()); //? Napuni order_items niz
    dispatch(getWishlistItems()); //? Napuni wishlist niz
    dispatch(setAlert("Logged in successfully", "success"));
  } catch ({ response }) {
    dispatch({ type: AUTO_SIGNIN_FAIL });
    dispatch(setAlert("Can not login!", "warning"));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAN_USER });
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Logged out successfully", "success"));
};

//? Optional feature
export const logoutAfterSession = (timer) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer * 60000);
};

export const deleteAccount = (history) => async (dispatch) => {
  try {
    await axios.delete("https://gameshop-g5.com/auth/delete");
    history.push("/");
    dispatch(setAlert("Account deleted", "success"));
    dispatch({ type: CLEAN_USER });
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};
