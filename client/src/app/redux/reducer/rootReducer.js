import { combineReducers } from "redux";
import productReducer from "./reducre";
import productCart from "./cartReducer";
const rootReducer = combineReducers(
    {
        productData:productReducer,
        cartData:productCart
    }
)

export default rootReducer;