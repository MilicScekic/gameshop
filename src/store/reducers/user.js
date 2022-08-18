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
  CLEAN_USER,
  CLEAN_GUEST,
  USER_PURCHASE,
  // GUEST_PURCHASE,
  GET_ORDER_ITEMS,
  GET_ALL_ORDERS,
  GET_WISHLIST,
  GET_WISHLIST_ID,
  CLEAR_WISHLIST,
  ADD_TO_USER_WISHLIST,
  CLEAR_ALL_ORDERS,
  CLEAR_ORDERS,
  REMOVE_ORDER,
  GET_ORDER_ID,
  CLEAR_DELPAY,
} from "../actions/types";

const initialState = {
  user: null,
  orderId: null,
  wishlistId: null,
  orders: null,
  all_orders: [],
  allOrdersCount: null,
  wishlist: null,
  guest: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    info: null,
  },
  delpay: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        user: null,
      };

    case GET_ORDER_ID:
      return {
        ...state,
        orderId: payload,
      };

    case GET_WISHLIST_ID:
      return {
        ...state,
        wishlistId: payload,
      };

    case GET_ORDER_ITEMS:
      return {
        ...state,
        orders: payload,
      };

    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null,
      };

    case GET_ALL_ORDERS:
      return {
        ...state,
        all_orders: [...state.all_orders, ...payload],
        allOrdersCount: payload.length,
      };

    case CLEAR_ALL_ORDERS:
      return {
        ...state,
        all_orders: [],
      };

    case GET_WISHLIST:
      return {
        ...state,
        wishlist: payload,
      };

    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };

    case ADD_TO_GUEST_CART:
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: [...state.guest.cart, { ...payload, quantity: 1 }],
        },
      };

    //* Ovo mi i ne treba. Jer ce svakako pri dodavanju refreshOrders da pokupi sa servera sve ordere tj. order iteme
    //! Ovo je zapravo dodaj u orders.
    // case ADD_TO_USER_CART:
    //   return {
    //     ...state,
    //     orders: [...state.orders, { ...payload }],
    //     // orders: {
    //     //   ...state.orders,
    //     //   order_items: [...state.orders.order_items, { ...payload }],
    //     // },
    //   };

    case REMOVE_ORDER:
      const newAllOrders = state.all_orders.filter(
        (order) => order.id !== payload
      );
      return {
        ...state,
        all_orders: { ...newAllOrders },
      };

    case REMOVE_FROM_GUEST_CART:
      const newGuestCart = state.guest.cart.filter(
        (item) => item.id !== payload
      );
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestCart,
        },
      };
    case REMOVE_FROM_USER_CART:
      const newUserOrders = state.orders.filter((item) => item.id !== payload);
      return {
        ...state,
        orders: newUserOrders,
      };

    case ADD_TO_USER_WISHLIST:
      return {
        ...state, // [...state.wishlist, { ...payload }]
        wishlist: [...state.wishlist, { ...payload }],
      };

    case REMOVE_FROM_USER_WISHLIST:
      const newFavs = state.wishlist.products.filter(
        (product) => product.id !== payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          favorites: newFavs,
        },
      };
    case SAVE_GUEST_INFO:
      const guestInfo = {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        // address: {
        //   street: payload.street,
        //   postalCode: payload.postalCode,
        //   city: payload.city,
        // },
        // phone: payload.phone,
      };
      return {
        ...state,
        guest: {
          ...state.guest,
          info: guestInfo,
        },
      };
    case SAVE_DELPAY:
      return {
        ...state,
        delpay: payload,
      };

    case CLEAR_DELPAY:
      return {
        ...state,
        delpay: null,
      };
    case INCREMENT_GUEST_PRODUCT:
      const newGuestIncCart = [...state.guest.cart];
      let incIndex = state.guest.cart.findIndex((prod) => prod.id === payload);
      let incProduct = { ...state.guest.cart[incIndex] };
      incProduct.quantity = incProduct.quantity + 1;
      newGuestIncCart[incIndex] = incProduct;
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestIncCart,
        },
      };
    case DECREMENT_GUEST_PRODUCT:
      const newGuestDecCart = [...state.guest.cart];
      let decIndex = state.guest.cart.findIndex((prod) => prod.id === payload);
      let decProduct = { ...state.guest.cart[decIndex] };
      decProduct.quantity = decProduct.quantity - 1;
      newGuestDecCart[decIndex] = decProduct;
      return {
        ...state,
        guest: {
          ...state.guest,
          cart: newGuestDecCart,
        },
      };
    case USER_PRODUCT_QUANTITY:
      const newCart = [...state.orders];
      const desiredIndex = state.orders.findIndex(
        (item) => item.id === payload.id
      );
      newCart[desiredIndex] = { ...payload };
      return {
        ...state,
        orders: newCart,
      };

    // case GUEST_PRODUCT_QUANTITY:
    //   const guestNewCart = [...state.guest.cart];
    //   const index = state.guest.cart.findIndex(
    //     (item) => item.id === payload.id
    //   );
    //   guestNewCart[index] = { ...payload };
    //   return {
    //     ...state,
    //     guest: {
    //       ...state.guest,
    //       cart: newGuestDecCart,
    //     },
    //   };

    case CLEAN_USER:
      return {
        ...state,
        user: null,
        all_orders: [],
        orders: [],
        wishlist: null,
        delpay: null,
      };
    case CLEAN_GUEST:
      return {
        ...state,
        guest: {
          cart: [],
          info: null,
        },
        delpay: null,
      };
    case USER_PURCHASE:
      return {
        ...state,
        orders: null,
        // orders: {
        //   ...state.orders,
        //   orders: [],
        //   checkout_date: Date.now(),
        // },
      };
    // case GUEST_PURCHASE:
    //   return {
    //     ...state,
    //     guest: {
    //       ...state.guest,
    //       cart: [],
    //     },
    //   };
    default:
      return state;
  }
};

export default userReducer;
