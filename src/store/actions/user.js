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
  GET_WISHLIST_ID,
  CLEAR_WISHLIST,
  ADD_TO_USER_WISHLIST,
  REMOVE_ORDER,
  GET_ORDER_ID,
  CLEAR_DELPAY,
} from "./types";
import { setAlert, showSpinner, hideSpinner } from "./visual";
import axios from "axios";
import { logout } from "./auth";

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
    const res = await axios.post(
      `https://gameshop-g5.com/orders/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    // dispatch(setAlert("Order opened!", "success"));
    dispatch({ type: GET_ORDER_ID, payload: res.data.id });
  } catch ({ response }) {
    dispatch(logout());
    // dispatch(setAlert(response.detail, "warning"));
  }
};

export const refreshOrders = () => async (dispatch) => {
  dispatch(clearOrders());
  dispatch(getOrders());
};

export const refreshOrderItems = () => async (dispatch) => {
  dispatch(clearOrderItems());
  dispatch(getOrderItems());
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
    // console.log("Get all orders");
    // console.log(res.data);
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

    // console.log("Order items");
    // console.log(res.data);
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

export const clearWishlistItems = () => async (dispatch) => {
  dispatch({ type: CLEAR_WISHLIST });
};

export const getWishlistItems = () => async (dispatch) => {
  try {
    const res = await axios.get("https://gameshop-g5.com/wishlist/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    // console.log(res.data); // niz products puni u wishlist
    dispatch({ type: GET_WISHLIST, payload: res.data });
  } catch ({ response }) {
    // dispatch(setAlert(response.data.message, "error"));
    dispatch(setAlert("Error", "error"));
  }
};

export const addToGuestCart = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`https://gameshop-g5.com/products/${id}/`);
    dispatch({ type: ADD_TO_GUEST_CART, payload: res.data });
    dispatch(setAlert("Product added to cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, "error"));
  }
};

export const addToUserCart = (orderId, productId) => async (dispatch) => {
  try {
    // const orderItem = await axios.post(
    await axios.post(
      `https://gameshop-g5.com/orders/${orderId}/order_items/`,
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

    //* U sustini mi ovo i ne treba. Jer ce se odma pri dodavanju osvjezit orderi. OrderItem data ne sadrzi npr. ime dodatog proizvoda
    // dispatch({ type: ADD_TO_USER_CART, payload: orderItem.data });

    dispatch(setAlert("Product added to cart", "success"));
  } catch ({ response }) {
    dispatch(setAlert("Not added", "error"));
  }
};

//! Matija treba da popravi wishlist. Nakon prvog dodavanja ne moze da se dodaje u listu zelja
// export const addToUserWishlist = (productId) => async (dispatch) => {
//   const data = { products: [productId] };

//   try {
//     const res = await axios.post("https://gameshop-g5.com/wishlist/", data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access")}`,
//       },
//     });

//     console.log(res.data);
//     // dispatch({ type: ADD_TO_USER_WISHLIST, payload: res.data });
//     dispatch(setAlert("Product added to wishlist", "success"));
//   } catch ({ response }) {
//     dispatch(setAlert("Not added", "error"));
//   }
// };

export const removeFromUserWishlist =
  (productId, wishlistId) => async (dispatch) => {
    try {
      await axios.delete(
        `https://gameshop-g5.com/wishlist/${wishlistId}/`,
        {
          products: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      dispatch({ type: REMOVE_FROM_USER_WISHLIST, payload: productId });
      dispatch(setAlert("Removed from favorites", "success"));
    } catch ({ response }) {
      dispatch(setAlert(response.data.message, "error"));
    }
  };

export const userPurchase = (orderId, history) => async (dispatch) => {
  dispatch(showSpinner());
  try {
    await axios.patch(
      `https://gameshop-g5.com/orders/${orderId}/checkout/`,
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

export const removeFromUserCart =
  (orderId, orderItemId) => async (dispatch) => {
    dispatch(showSpinner());
    try {
      await axios.delete(
        `https://gameshop-g5.com/orders/${orderId}/order_items/${orderItemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      dispatch({ type: REMOVE_FROM_USER_CART, payload: orderItemId });
      dispatch(hideSpinner());
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
      // dispatch(hideSpinner());
      dispatch(setAlert("Something went wrong!", "error"));
      // dispatch(setAlert(response.data.message, "error"));
    }
  };

export const clearDelpay = () => (dispatch) => dispatch({ type: CLEAR_DELPAY });
