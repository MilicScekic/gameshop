import {
  GET_PROFILE,
  ADD_TO_GUEST_CART,
  ADD_TO_USER_CART,
  CLEAR_PROFILE,
  ADD_TO_USER_FAVS,
  REMOVE_FROM_USER_WISHLIST,
  REMOVE_FROM_GUEST_CART,
  REMOVE_FROM_USER_CART,
  SAVE_GUEST_INFO,
  SAVE_DELPAY,
  INCREMENT_GUEST_PRODUCT,
  DECREMENT_GUEST_PRODUCT,
  USER_PRODUCT_QUANTITY,
  CLEAN_GUEST,
  USER_PURCHASE,
  GET_ORDER_ITEMS,
  CLEAR_ORDERS,
  GET_ALL_ORDERS, //Za admina svi orderi
  CLEAR_ALL_ORDERS,
  GET_WISHLIST,
  ADD_TO_USER_WISHLIST,
  REMOVE_ORDER,
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
export const openOrder = () => async (dispatch) => {
  try {
    await axios.post(
      `https://gameshop-g5.com/orders/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    // dispatch(setAlert("Order opened!", "success"));
  } catch ({ response }) {
    // dispatch(setAlert("Order is not opened!", "warning"));
    // dispatch(setAlert(response.detail, "warning"));
  }
};

export const clearOrders = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL_ORDERS });
};

//* Vraca sve ordere (admin). A za obicnog korisnika vraca samo njegove ordere. Popunjava niz takodje
export const getOrders = () => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const res = await axios.get("https://gameshop-g5.com/orders/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log("Get all orders");
    console.log(res.data);
    dispatch({ type: GET_ALL_ORDERS, payload: res.data });
    dispatch(hideSpinner());
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const clearOrderItems = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDERS });
};

//? Popunice state orders sa objektom koji u sebi sadrzi order_items niz
export const getOrderItems = () => async (dispatch) => {
  try {
    const order = await axios.post(
      `https://gameshop-g5.com/orders/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    const res = await axios.get(
      `https://gameshop-g5.com/orders/${order.data.id}/order_items/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    console.log("Order items");
    console.log(res.data);
    dispatch({ type: GET_ORDER_ITEMS, payload: res.data });
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const removeOrder = (orderId) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    await axios.delete(`https://gameshop-g5.com/orders/${orderId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    dispatch({ type: REMOVE_ORDER, payload: orderId });
    dispatch(setAlert("Removed order", "success"));
    dispatch(hideSpinner());
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert("Order is not removed. Try again!", "error"));
  }
};

export const getWishlistItems = () => async (dispatch) => {
  try {
    const res = await axios.get("https://gameshop-g5.com/wishlist/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    console.log(res.data); // niz products puni u wishlist
    dispatch({ type: GET_WISHLIST, payload: res.data });
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

export const addToUserCart = (productId) => async (dispatch) => {
  try {
    //! Neprakticno
    const order = await axios.post(
      "https://gameshop-g5.com/orders/",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    const orderItem = await axios.post(
      `https://gameshop-g5.com/orders/${order.data.id}/order_items/`,
      {
        product: productId,
        quantity: 1,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    dispatch({ type: ADD_TO_USER_CART, payload: orderItem.data });
    dispatch(setAlert("Product added to cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Not added", "error"));
  }
};

export const addToUserWishlist = (productId) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://gameshop-g5.com/wishlist/",
      { products: [productId] },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    console.log(res.data);

    dispatch({ type: ADD_TO_USER_WISHLIST, payload: res.data });
    dispatch(setAlert("Product added to wishlist", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Not added", "error"));
  }
};

export const removeFromUserWishlist = (id) => async (dispatch) => {
  try {
    const wishlist = await axios.get(`https://gameshop-g5.com/wishlist/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    // console.log(wishlist);

    await axios.delete(
      `https://gameshop-g5.com/wishlist/${wishlist.data[0].id}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    dispatch({ type: REMOVE_FROM_USER_WISHLIST, payload: id });
    dispatch(setAlert("Removed from favorites", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const userPurchase = (history) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    const order = await axios.post(
      "https://gameshop-g5.com/orders/",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    await axios.patch(
      `https://gameshop-g5.com/orders/${order.data.id}/checkout/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    dispatch({ type: USER_PURCHASE });
    dispatch(hideSpinner());
    history.push("/");
    dispatch(setAlert("Payment successful", "success"));
  } catch ({ response }) {
    dispatch(hideSpinner());
    dispatch(setAlert("Error in purchasing!", "error"));
  }
};

export const removeFromGuestCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_GUEST_CART, payload: id });
};

export const removeFromUserCart = (id) => async (dispatch) => {
  try {
    const order = await axios.post(
      "https://gameshop-g5.com/orders/",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    await axios.delete(
      `https://gameshop-g5.com/orders/${order.data.id}/order_items/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    dispatch({ type: REMOVE_FROM_USER_CART, payload: id });
    dispatch(setAlert("Removed from cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const addToUserFavorites = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/me/fav/${id}`);
    dispatch({ type: ADD_TO_USER_FAVS, payload: res.data });

    dispatch(setAlert("Added to favorites", "success"));
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

export const handleUserQuantity =
  (orderId, orderItemId, qty) => async (dispatch) => {
    try {
      const res = await axios.patch(
        `https://gameshop-g5.com/orders/${orderId}/order_items/${orderItemId}/`,
        { quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      dispatch({ type: USER_PRODUCT_QUANTITY, payload: res.data });
    } catch ({ response }) {
      dispatch(setAlert(response.data.message, "error"));
    }
  };
