import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer, {
  newReviewReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import logger from "redux-logger";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer.js";

const rootReducer = combineReducers({
  products: productReducer,
  productsDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(getProduct());
export default store;
