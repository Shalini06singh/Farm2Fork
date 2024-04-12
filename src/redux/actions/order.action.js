import { GET_ORDERS_BY_USER_ERROR, GET_ORDERS_BY_USER_START, GET_ORDERS_BY_USER_SUCCESS, GET_ORDERS_ERROR, GET_ORDERS_START, GET_ORDERS_SUCCESS, PLACE_ORDER_ERROR, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from "../constants/order.constant"

export const getOrderStart = () => ({
    type: GET_ORDERS_START
})

export const getOrderSuccess = (orders) => ({
    type: GET_ORDERS_SUCCESS,
    payload: orders
})

export const getOrderError = (error) => ({
    type: GET_ORDERS_ERROR,
    payload: error
})

export const getOrderByUserStart = (userName) => ({
    type: GET_ORDERS_BY_USER_START,
    payload: userName
})

export const getOrderByUserSuccess = (orders) => ({
    type: GET_ORDERS_BY_USER_SUCCESS,
    payload: orders
})

export const getOrderByUserError = (error) => ({
    type: GET_ORDERS_BY_USER_ERROR,
    payload: error
})


export const placeOrderStart = (order) => ({
    type: PLACE_ORDER_START,
    payload: order
})

export const placeOrderSuccess = (order) => ({
    type: PLACE_ORDER_SUCCESS,
    payload: order
})

export const placeOrderError = (error) => ({
    type: PLACE_ORDER_ERROR,
    payload: error
})
