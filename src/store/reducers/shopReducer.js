export const initialState = {
  products: [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //? ovaj nacin destrukturira objekat da bi umetnuo jos i qty attribut
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    // return { ...state, cart: [action.payload, ...state.cart] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product.id !== action.payload //po izabranom proizvodu brisanje
        ),
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((product) =>
          product.id === action.payload.id
            ? (product.qty = action.payload.qty)
            : product.qty
        ),
      };

    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };

    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };

    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };

    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };

    case "FILTER_BY_SEARCH":
      return { ...state, searchText: action.payload };

    case "CLEAR_FILTERS":
      return {
        products: initialState.products,
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };

    default:
      break;
  }
};
