import { GET_ORDERS_SUCCESS } from "../constants/order.constant";

const initialState = {
    orders: localStorage.getItem('orders') ? JSON.parse(
                    localStorage.getItem('orders')
                ) : {}
}

export const OrderReducer = (state = initialState, action) => {
    switch (action?.type) {
        case GET_ORDERS_SUCCESS:
            localStorage.setItem('orders', JSON.stringify(action.payload))

            return {
                ...state,
                orders: [...action.payload]
            }

        default:
            return state;
    }
}