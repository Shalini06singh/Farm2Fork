import {
    GET_CART_SUCCESS
} from "../constants/cart.constant";

const initialState = {
    cartItem: localStorage.getItem('cartItem') ? JSON.parse(
        localStorage.getItem('cartItem')
    ) : {
        customer: {},
        items: [],
        subTotal: 0,
        tax: 0,
        grandTotal: 0,
        orderPlaced: false
    }
}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_SUCCESS:
            
            localStorage.setItem('cartItem', JSON.stringify(action.payload))
            return {
                ...state,
                cartItem: {
                    ...action.payload
                }
            };


        default:
            return state;
    }
}