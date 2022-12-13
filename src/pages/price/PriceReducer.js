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
    },
    reducers: {
        prices: (state, action) => {
            state.prices = action.payload;
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

export const getPrice = () => apiCall({
    url: "/price",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
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
    url: "/price",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editPrice = (data) => apiCall({
    url: "/price/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;