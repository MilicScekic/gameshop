import { combineReducers } from "redux";
import products from "./reducers/products";
import visual from "./reducers/visual";

export default combineReducers({
  products,
  visual,
});
