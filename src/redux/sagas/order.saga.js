import { put, takeLatest } from 'redux-saga/effects'
import { GET_ORDERS_START, PLACE_ORDER_START } from '../constants/order.constant';
import { getOrderFromApi, placeOrderToApi } from '../sevices/order.service';
import { getOrderError, getOrderStart, getOrderSuccess, placeOrderError } from '../actions/order.action';
import { getCartStart } from '../actions/cart.action';

function* getOrders() {
    try {
        let result = yield getOrderFromApi();
        yield put(getOrderSuccess(result))
    } catch (error) {
        yield put(getOrderError(error.message))
    }
}

function* placeOrder({payload}) {
    console.log(payload);
  
    try {
        yield placeOrderToApi(payload)
        yield put(getOrderStart())  
        yield put(getCartStart())
    } catch (error) {
        yield put(placeOrderError(error.message))
        
    }
}

export function* order() {
    yield takeLatest(GET_ORDERS_START, getOrders)
    yield takeLatest(PLACE_ORDER_START, placeOrder)
}