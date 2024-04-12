import { put, takeLatest } from 'redux-saga/effects'
import { REGISTER_START } from '../constants/authentication.constant';
import { registerError } from '../actions/authentication.action';
import { registerUserFromApi } from '../sevices/authentication.service';

function* registerUser({payload}) {
    try {
        yield registerUserFromApi(payload)
    } catch (error) {
        yield put(registerError(error.message))
    }
}

export function* authentication() {
    yield takeLatest(REGISTER_START, registerUser)
}