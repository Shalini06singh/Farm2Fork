import { put, takeLatest } from 'redux-saga/effects'
import { ADD_CATEGORY_START, DELETE_CATEGORY_START, GET_CATEGORY_START, UPDATE_CATEGORY_START } from "../constants/category.constant";
import { addCategoryError, deleteCategoryError, getCategoryError, getCategoryStart, getCategorySuccess, updateCategoryError } from '../actions/category.action';
import { addCategoryToApi, deleteCategoryToApi, getCategoryFromApi, updateCategoryToApi } from '../sevices/category.service';

function* getCategory() {
    try {
        let result = yield getCategoryFromApi();
        yield put(getCategorySuccess(result))
    } catch (error) {
        yield put(getCategoryError(error.message))
    }
}

function* addCategory({payload}) {
    try {
        yield addCategoryToApi(payload)
        yield put(getCategoryStart())  
    } catch (error) {
        yield put(addCategoryError(error.message))
    }
}

function* deleteCategory({payload}) {
    try {
        yield deleteCategoryToApi(payload)
        yield put(getCategoryStart())  
    } catch (error) {
        yield put(deleteCategoryError(error.message))
    }
}

function* updateCategory({payload}) {
    try {
        yield updateCategoryToApi(payload.category, payload.id)
        yield put(getCategoryStart())  
    } catch (error) {
        yield put(updateCategoryError(error.message))
    }
}

export function* category() {
    yield takeLatest(GET_CATEGORY_START, getCategory)
    yield takeLatest(ADD_CATEGORY_START, addCategory)
    yield takeLatest(DELETE_CATEGORY_START, deleteCategory)
    yield takeLatest(UPDATE_CATEGORY_START, updateCategory)
}