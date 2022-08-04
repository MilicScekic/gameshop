import {
  GET_PROFILE,
  ADD_TO_GUEST_CART,
  ADD_TO_USER_CART,
  CLEAR_PROFILE,
  ADD_TO_USER_FAVS,
  REMOVE_FROM_USER_FAVS,
  REMOVE_FROM_GUEST_CART,
  REMOVE_FROM_USER_CART,
  SAVE_GUEST_INFO,
  SAVE_DELPAY,
  INCREMENT_GUEST_PRODUCT,
  DECREMENT_GUEST_PRODUCT,
  USER_PRODUCT_QUANTITY,
  CLEAN_GUEST,
  USER_PURCHASE,
  GUEST_PURCHASE,
  GET_PRODUCTS,
  STOP_PAGINATION,
  GET_ORDERS,
  GET_ORDERS_ID,
} from "./types";
import { setAlert, showSpinner, hideSpinner } from "./visual";
import axios from "axios";

export const getUserProfile = (token) => async (dispatch) => {
  try {
    //* Ovdje je cilj da se popuni user objekat/state u reducer(user)
    //? Daj mi podatke o prijavljenom korisniku
    const res = await axios.get(`https://gameshop-g5.com/auth/current_user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: CLEAN_GUEST });
    dispatch({ type: GET_PROFILE, payload: res.data }); //?  user: { res.data } Popunjava se objekat user
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const clearUserProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const updateUserProfile = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/me", formData);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert("Delivery info updated", "success"));
    history.push("/me");
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

//* Ovo mu dodje kao: Spremi korpu za trgovinu
export const openOrder = (token) => async (dispatch) => {
  try {
    await axios.post(
      `https://gameshop-g5.com/orders/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setAlert("Order opened!", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Order is not opened!", "warning"));
    // dispatch(setAlert(response.detail, "warning"));
  }
};

export const getOrderItems = () => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://gameshop-g5.com/orders/",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    console.log(res.data);
    dispatch({ type: GET_ORDERS, payload: res.data });
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const addToGuestCart = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_GUEST_CART, payload: product });
    dispatch(setAlert("Product added to cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const addToUserCart = (id) => async (dispatch) => {
  const orderId = dispatch({ type: GET_ORDERS_ID });
  try {
    const res = await axios.post(
      `https://gameshop-g5.com/orders/2/order_items/`,
      {
        product: id,
        quantity: 1,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    console.log("order id:", orderId);

    dispatch({ type: ADD_TO_USER_CART, payload: res.data });
    dispatch(setAlert("Product added to cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Not added", "error"));
  }
};

export const removeFromGuestCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_GUEST_CART, payload: id });
};

export const removeFromUserCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/me/cart/${id}`);
    dispatch({ type: REMOVE_FROM_USER_CART, payload: id });
    dispatch(setAlert("Removed from cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const addToUserFavorites = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/me/fav/${id}`);
    dispatch({ type: ADD_TO_USER_FAVS, payload: res.data.favorites });

    dispatch(setAlert("Added to favorites", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const removeFromUserFavorites = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/me/fav/${id}`);
    dispatch({ type: REMOVE_FROM_USER_FAVS, payload: id });
    dispatch(setAlert("Removed from favorites", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const saveGuestInfo = (formData) => (dispatch) => {
  dispatch({ type: SAVE_GUEST_INFO, payload: formData });
};

export const saveDelpay = (formData) => (dispatch) => {
  dispatch({ type: SAVE_DELPAY, payload: formData });
};

export const handleGuestQuantity = (type, prodId) => (dispatch) => {
  type === "increment"
    ? dispatch({ type: INCREMENT_GUEST_PRODUCT, payload: prodId })
    : dispatch({ type: DECREMENT_GUEST_PRODUCT, payload: prodId });
};

export const handleUserQuantity = (type, prodId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/me/cart/${prodId}`, { type });
    dispatch({ type: USER_PRODUCT_QUANTITY, payload: res.data });
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const userPurchase = (history) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    await axios.post("/api/products/quantity/user");
    dispatch({ type: USER_PURCHASE });
    dispatch(hideSpinner());
    history.push("/");
    dispatch(setAlert("Payment successful", "success"));
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const guestPurchase = (cart, history) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    await axios.post("/api/products/quantity/guest", { cart });
    dispatch({ type: GUEST_PURCHASE });
    dispatch(hideSpinner());
    history.push("/");
    dispatch(setAlert("Payment successful", "success"));
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert(response.data.message, "error"));
  }
};
