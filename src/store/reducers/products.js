import {
  GET_PRODUCTS,
  CLEAR_PRODUCTS,
  STOP_PAGINATION,
  GET_CURRENT_PRODUCT,
  CLEAR_CURRENT_PRODUCT,
  ADD_NEW_REVIEW,
  ADD_NEW_COMMENT,
  GET_CATEGORIES,
  CLEAR_CATEGORIES,
  ADD_PRODUCT,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  GET_ALL_PRODUCTS,
  CLEAR_ALL_PRODUCTS,
  GET_LATEST_PRODUCTS,
  CLEAR_LATEST_PRODUCTS,
  GET_GAMES,
  CLEAR_GAMES,
} from "../actions/types";

const initialState = {
  productCount: null,
  products: [],
  latest_products: [],
  games: [],
  categories: [],
  currentProduct: null,
  paginationable: true,
  previous: null,
  next: null,
  all_products: [], //? Ovo mi treba da azurira bas sve proizvode. Nema paginacije ni counta. Koristice se pretragu i Dashboard
  allProductsCount: null, //! Za svaki slucaj. Ovo mi treba za dashboard da znam koliko je stvarno ukupno proizvoda
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...payload],
        productCount: payload.length,
        paginationable: true,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        productCount: null,
        paginationable: null,
      };

    case GET_LATEST_PRODUCTS:
      return {
        ...state,
        latest_products: [...state.latest_products, ...payload],
      };
    case CLEAR_LATEST_PRODUCTS:
      return {
        ...state,
        latest_products: [],
      };
    case GET_GAMES:
      return {
        ...state,
        games: [...state.games, ...payload],
      };
    case CLEAR_GAMES:
      return {
        ...state,
        games: [],
      };
    case STOP_PAGINATION:
      return {
        ...state,
        paginationable: false,
      };
    case GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
      };
    case CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: null,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, ...payload],
      };

    case ADD_NEW_COMMENT:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          comments: payload,
        },
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, ...payload],
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
      };

    case PREVIOUS_PAGE:
      return {
        ...state,
        previous: payload,
      };

    case NEXT_PAGE:
      return {
        ...state,
        next: payload,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        all_products: [...state.all_products, ...payload],
        allProductsCount: payload.length,
      };

    case CLEAR_ALL_PRODUCTS:
      return {
        ...state,
        all_products: [],
      };

    default:
      return state;
  }
};

export default productsReducer;
