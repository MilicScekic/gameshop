import { faker } from "@faker-js/faker";

const fakerProducts = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.technics(),
  inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
}));

export const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : fakerProducts,
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
        products: fakerProducts,
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };

    default:
      break;
  }
};
