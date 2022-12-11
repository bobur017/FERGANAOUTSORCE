import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "supplier",
    initialState: {
        result: {},
        error: {},
        suppliers: [],
        supplierInfo: {},
    },
    reducers: {
        suppliers: (state, action) => {
            state.suppliers = action.payload;
        },
        supplierInfo: (state, action) => {
            state.supplierInfo = action.payload;
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

export const getSupplierInfo = (params) => apiCall({
    url: "/supplier/info",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.supplierInfo.type,
    error: slice.actions.errorReducer.type
});

export const getSupplier = () => apiCall({
    url: "/supplier",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.suppliers.type,
    error: slice.actions.errorReducer.type
})
export const getSupplierAll = () => apiCall({
    url: "/supplier",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.suppliers.type,
    error: slice.actions.errorReducer.type
})

export const deleteSupplier = (data) => apiCall({
    url: "/supplierGroup/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addSupplier = (data) => apiCall({
    url: "/supplier",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editSupplier = (data) => apiCall({
    url: "/supplierGroup/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})



export default slice.reducer;