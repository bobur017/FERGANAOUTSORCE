import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "order",
    initialState: {
        result: {},
        error: {},
        orders: [],
        order: {},
    },
    reducers: {
        orders: (state, action) => {
            state.orders = action.payload;
        },
        order: (state, action) => {
            state.order = action.payload;
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

export const getOrder = () => apiCall({
    url: "/order",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.orders.type,
    error: slice.actions.errorReducer.type
})
export const getOrderOne = (id) => apiCall({
    url: "/order/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.order.type,
    error: slice.actions.errorReducer.type
})

export const deleteOrder = (data) => apiCall({
    url: "/order/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addOrder = (data) => apiCall({
    url: "/order",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editOrder = (id,data) => apiCall({
    url: "/order/" + id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;