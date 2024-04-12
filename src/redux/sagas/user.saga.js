import { put, takeLatest } from 'redux-saga/effects'
import { ADD_USER_START, DELETE_USER_START, GET_USER_START, LOGINED_USER_START, LOGOUT_USER_START, PROFILE_EDT_USER_START, UPDATE_USER_START } from '../constants/user.constant';
import { addUserError, deleteUserError, getUserError, getUserStart, getUserSuccess, loginedUserSuccess, logoutUserError, logoutUserSuccess, profileEditUserError, profileEditUserSuccess, updateUserError } from '../actions/user.action';
import { loginedUserError } from './../actions/user.action';
import { addUserToApi, deleteUserToApi, getUserFromApi, updateUserToApi } from '../sevices/user.service';
import { loginUserFromApi } from '../sevices/authentication.service';

function* getUser() {
    try {
        let result = yield getUserFromApi();
        yield put(getUserSuccess(result))
    } catch (error) {
        yield put(getUserError(error.message))
    }
}

function* addUser({payload}) {
    try {
        yield addUserToApi(payload)
        yield put(getUserStart())  
    } catch (error) {
        yield put(addUserError(error.message))
    }
}

function* deleteUser({payload}) {
    try {
        yield deleteUserToApi(payload)
        yield put(getUserStart())  
    } catch (error) {
        yield put(deleteUserError(error.message))
    }
}

function* updateUser({payload}) {
    try {
        yield updateUserToApi(payload.user, payload.id)
        yield put(getUserStart())  
    } catch (error) {
        yield put(updateUserError(error.message))
    }
}

function* loginedUser({payload}) {
    try {
        let result = yield loginUserFromApi(payload)
        yield put(loginedUserSuccess(result))  
    } catch (error) {
        yield put(loginedUserError(error.message))
    }
}

function* logoutUser() {
    try {
        yield put(logoutUserSuccess())  
    } catch (error) {
        yield put(logoutUserError(error.message))
    }
}

function* profileEditUser({payload}) {
    try {
        let response = yield updateUserToApi(payload.user, payload.id)
        yield put(getUserStart())
        yield put(profileEditUserSuccess(response.user))  

    } catch (error) {
        yield put(profileEditUserError(error.message))
    }
}

export function* user() {
    yield takeLatest(GET_USER_START, getUser)
    yield takeLatest(ADD_USER_START, addUser)
    yield takeLatest(DELETE_USER_START, deleteUser)
    yield takeLatest(UPDATE_USER_START, updateUser)
    yield takeLatest(LOGINED_USER_START, loginedUser)
    yield takeLatest(LOGOUT_USER_START, logoutUser)
    yield takeLatest(PROFILE_EDT_USER_START, profileEditUser)
}