import { put, takeLatest } from 'redux-saga/effects'
import { ADD_CART_START, DELETE_CART_START, GET_CART_START, UPDATE_CART_START } from '../constants/cart.constant';
import { addCartError, getCartError, getCartStart, getCartSuccess, updateCartError } from '../actions/cart.action';
import { addCartToApi, deleteCartToApi, getCartFromApi, updateCartToApi } from '../sevices/cart.service';

function* getCart() {
    try {
        let result = yield getCartFromApi();
        yield put(getCartSuccess(result))
    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({payload}) {
    try {
        yield addCartToApi(payload.cartItemObject, payload.userId)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

function* updateCart({payload}) {
    try {
        yield updateCartToApi(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(updateCartError(error.message))
    }
}

function* deleteCart({payload}) {
    try {
        yield deleteCartToApi(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(updateCartError(error.message))
    }
}

export function* cart() {
    yield takeLatest(GET_CART_START, getCart)
    yield takeLatest(ADD_CART_START, addCart)
    yield takeLatest(UPDATE_CART_START, updateCart)
    yield takeLatest(DELETE_CART_START, deleteCart)

}