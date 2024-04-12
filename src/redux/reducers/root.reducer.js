import { combineReducers } from "@reduxjs/toolkit";
import { CategoryReducer } from "./category.reducer";
import { ProductReducer } from "./product.reducer";
import { UserReducer } from "./user.reducer";
import { CartReducer } from "./cart.reducer";
import { OrderReducer } from "./order.reducer";

export const RootReducer = combineReducers({
    category: CategoryReducer,
    product: ProductReducer,
    user: UserReducer,
    cart: CartReducer,
    order: OrderReducer
})