import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "warehouse",
    initialState: {
        result: {},
        error: {},
        warehouses: [],
        acceptedProduct: [],
        acceptedProducts: [],
    },
    reducers: {
        warehouses: (state, action) => {
            state.warehouses = action.payload;
        },
        acceptedProduct: (state, action) => {
            state.acceptedProduct = action.payload;
        },
        acceptedProducts: (state, action) => {
            state.acceptedProducts = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})

export const getWarehouse = () => apiCall({
    url: "/warehouse",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.warehouses.type,
    error: slice.actions.errorReducer.type
})

export const getAcceptedProduct = () => apiCall({
    url: "/acceptedProduct/contract",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.acceptedProduct.type,
    error: slice.actions.errorReducer.type
})

export const deleteWarehouse = (data) => apiCall({
    url: "/warehouse/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addWarehouse = (data) => apiCall({
    url: "/warehouse",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addProductContract = (data) => apiCall({
    url: "/acceptedProduct/"+data.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getAcceptedProductAll = () => apiCall({
    url: "/acceptedProduct",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.acceptedProducts.type,
    error: slice.actions.errorReducer.type
})

export const editWarehouse = (data) => apiCall({
    url: "/warehouse/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;