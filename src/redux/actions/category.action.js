import { ADD_CATEGORY_ERROR, ADD_CATEGORY_START, ADD_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR, DELETE_CATEGORY_START, DELETE_CATEGORY_SUCCESS, GET_CATEGORY_ERROR, GET_CATEGORY_START, GET_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_START, UPDATE_CATEGORY_SUCCESS } from "../constants/category.constant";

export const getCategoryStart = () => ({
    type: GET_CATEGORY_START
})

export const getCategorySuccess = (categories) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: categories
})

export const getCategoryError = (error) => ({
    type: GET_CATEGORY_ERROR,
    payload: error
})

export const addCategoryStart = (category) => ({
    type: ADD_CATEGORY_START,
    payload: category
})

export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category
})

export const addCategoryError = (error) => ({
    type: ADD_CATEGORY_ERROR,
    payload: error
})

export const deleteCategoryStart = (category) => ({
    type: DELETE_CATEGORY_START,
    payload: category
})

export const deleteCategorySuccess = (category) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: category
})

export const deleteCategoryError = (error) => ({
    type: DELETE_CATEGORY_ERROR,
    payload: error
})


export const updateCategoryStart = (category, id) => ({
    type: UPDATE_CATEGORY_START,
    payload:  {
        category,
        id
    }
})

export const updateCategorySuccess = (category, id) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: {
        category,
        id
    }
})

export const updateCategoryError = (error) => ({
    type: UPDATE_CATEGORY_ERROR,
    payload: error
})