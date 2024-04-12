import { ADD_PRODUCT_ERROR, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_ERROR, GET_PRODUCT_START, GET_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_START, UPDATE_PRODUCT_SUCCESS } from "../constants/product.constant";

export const getProductStart = () => ({
    type: GET_PRODUCT_START
})

export const getProductSuccess = (products) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: products
})

export const getProductError = (error) => ({
    type: GET_PRODUCT_ERROR,
    payload: error
})

export const addProductStart = (product) => ({
    type: ADD_PRODUCT_START,
    payload: product
})

export const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

export const addProductError = (error) => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
})

export const deleteProductStart = (product) => ({
    type: DELETE_PRODUCT_START,
    payload: product
})

export const deleteProductSuccess = (product) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: product
})

export const deleteProductError = (error) => ({
    type: DELETE_PRODUCT_ERROR,
    payload: error
})


export const updateProductStart = (product, id) => ({
    type: UPDATE_PRODUCT_START,
    payload:  {
        product,
        id
    }
})

export const updateProductSuccess = (product, id) => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: {
        product,
        id
    }
})

export const updateProductError = (error) => ({
    type: UPDATE_PRODUCT_ERROR,
    payload: error
})