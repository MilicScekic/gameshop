import {
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  STOP_PAGINATION,
  GET_CURRENT_PRODUCT,
  CLEAR_CURRENT_PRODUCT,
  ADD_NEW_REVIEW,
} from "./types";
import { showSpinner, hideSpinner, setAlert } from "./visual";
import axios from "axios";
import { cors } from "../reducers/auth";

export const clearProducts = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCTS });
};

export const getProducts = (targetUrl) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.get(cors + targetUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    res.data.length === 0
      ? dispatch({ type: STOP_PAGINATION })
      : dispatch({ type: GET_PRODUCTS, payload: res.data });
    dispatch(setAlert("Enjoy in shopping :)", "success"));
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch(hideSpinner());
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const getCurrentProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${cors}https://gameshop-g5.com/products/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    dispatch({ type: GET_CURRENT_PRODUCT, payload: res.data });
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message && response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const clearCurrentProduct = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_PRODUCT });
};

export const postNewReview = (formData, productId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/products/${productId}/review`, formData);
    dispatch({ type: ADD_NEW_REVIEW, payload: res.data.reviews });
    dispatch(setAlert("Review posted", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message && response.data.message, "error"));
  }
};
