import { useReducer, createContext, useEffect, useContext } from "react";
import {
  cartReducer,
  productReducer,
  initialState,
} from "../reducers/shopReducer";

export const CartContext = createContext(initialState);

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products));
    localStorage.setItem("cart", JSON.stringify(state.cart));

    // localStorage.removeItem("cart", state.cart);
  }, [state]);

  //* Actions (Cart)
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const changeCartQty = (id, qty) => {
    dispatch({ type: "CHANGE_CART_QTY", payload: { id: id, qty: qty } });
  };

  //* Actions (Products)
  const sortByPriceAsc = () => {
    productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" });
  };

  const sortByPriceDesc = () => {
    productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" });
  };

  const filterByStock = () => {
    productDispatch({ type: "FILTER_BY_STOCK" });
  };

  const filterByFastDelivery = () => {
    productDispatch({ type: "FILTER_BY_DELIVERY" });
  };

  const filterByRating = (rating) => {
    productDispatch({ type: "FILTER_BY_RATING", payload: rating + 1 });
  };

  const clearFilters = () => {
    productDispatch({ type: "CLEAR_FILTERS" });
  };

  const searchProducts = (search) => {
    productDispatch({ type: "FILTER_BY_SEARCH", payload: search });
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        addToCart,
        removeFromCart,
        changeCartQty,
        //
        sort: productState.sort,
        byStock: productState.byStock,
        byFastDelivery: productState.byFastDelivery,
        byRating: productState.byRating,
        searchText: productState.searchText,
        sortByPriceAsc,
        sortByPriceDesc,
        filterByStock,
        filterByFastDelivery,
        filterByRating,
        clearFilters,
        searchProducts,

        //
        // productDispatch, //? za drugi nacin
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
