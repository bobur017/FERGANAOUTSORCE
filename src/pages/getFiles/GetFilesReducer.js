import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "getFiles",
    initialState: {
        result: {},
        error: {},
        getFiless:{},
    },
    reducers: {
        getFiless: (state, action) => {
            state.getFiless = action.payload;
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

export const getGetFiles = () => apiCall({
    url: "/warehouse/getFile",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.getFiless.type,
    error: slice.actions.errorReducer.type
})

export const deleteGetFiles = (data) => apiCall({
    url: "/getFiles/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addGetFiles = (data) => apiCall({
    url: "/getFiles",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editGetFiles = (data) => apiCall({
    url: "/getFiles/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;