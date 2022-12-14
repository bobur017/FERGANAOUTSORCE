import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "price",
    initialState: {
        result: {},
        error: {},
        prices: [],
        pricesByProduct: [],
    },
    reducers: {
        prices: (state, action) => {
            state.prices = action.payload;
        },
        pricesByProduct: (state, action) => {
            state.pricesByProduct = action.payload;
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

export const getPriceAll = (params) => apiCall({
    url: "/productPrice",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.prices.type,
    error: slice.actions.errorReducer.type
})

export const deletePrice = (data) => apiCall({
    url: "/price/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addPrice = (data) => apiCall({
    url: "/productPrice",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editPrice = (data) => apiCall({
    url: "/productPrice/" + data?.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const byProductPrice = (data,params) => apiCall({
    url: "/productPrice/" + data?.id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.pricesByProduct.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;